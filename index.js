'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const axios = require('axios');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  const incomingMessage = event.message.text.split(" ");
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }
  if(incomingMessage[0] === '/getuid'){
    return client.replyMessage(event.replyToken, {
      type : 'text', text : event.source.userId
    });
  }

  //Get Tugas
  if(incomingMessage[0] === '/tugas'){
    const return_tugas = async () => {
      try{
        const response = await axios.get("https://pyrgoose.firebaseio.com/tugas.json");

        var msgStr = "";
        Object.keys(response.data).forEach((key) => {
          if(msgStr === ""){
            msgStr = "[LIST TUGAS]\n\n" + "[" + key + "]" + "\n" + response.data[key];
          }else{
            msgStr = msgStr + "\n" + "\n" + "[" + key + "]" + "\n" + response.data[key];
          }
        });
        return client.replyMessage(event.replyToken, {
          type : 'text', text : msgStr
        });
      }
      catch(err){ 
        new Error("Cannot get tugas!")
      }
    }
    return_tugas();
  }
  //Post Tugas
  if(incomingMessage[0] === '/tugas_post'){
    if(event.source.userId !== 'Ub5b1cdca57cc02f277da5628b76614e7'){
      return client.replyMessage(event.replyToken, {
        type : 'text', text : "Unauthorized!"
      });
    }
    incomingMessage.shift();
    var command = incomingMessage[0];
    incomingMessage.shift();
    var body = incomingMessage.join(" ");
    var posted = {
      [command] : body
    };
    const post_tugas = async() =>{
      try{
        await axios.patch('https://pyrgoose.firebaseio.com/tugas.json', posted);
        return client.replyMessage(event.replyToken, {
          type : 'text', text : "Tugas berhasil ditambahkan"
        })
      }
      catch(error){
        console.log(error);
      }
    }
    post_tugas();
  }
  //Update Tugas
  if(incomingMessage[0] === '/tugas_update'){
    if(event.source.userId !== 'Ub5b1cdca57cc02f277da5628b76614e7'){
      return client.replyMessage(event.replyToken, {
        type : 'text', text : "Unauthorized!"
      });
    }
    incomingMessage.shift();
    var command = incomingMessage[0];
    incomingMessage.shift();
    var body = incomingMessage.join(" ");
    const update_tugas = async() =>{
      try{
        var current_tugas = await axios.get("https://pyrgoose.firebaseio.com/tugas.json");
        current_tugas = current_tugas.data[command];
        const posted = {
          [command] : current_tugas + "\n" + body
        }
        await axios.patch('https://pyrgoose.firebaseio.com/tugas.json', posted);
        return client.replyMessage(event.replyToken, {
          type : 'text', text : "Tugas berhasil ditambahkan!"
        })
      }
      catch(error){
        console.log(error);
      }
    }
    update_tugas();
  }
  //Delete Tugas
  if(incomingMessage[0] === '/tugas_delete'){
    if(event.source.userId !== 'Ub5b1cdca57cc02f277da5628b76614e7'){
      return client.replyMessage(event.replyToken, {
        type : 'text', text : "Unauthorized!"
      });
    }
    const delete_tugas = async() =>{
      try{
        await axios.delete(`https://pyrgoose.firebaseio.com/tugas/${incomingMessage[1]}.json`);
        return client.replyMessage(event.replyToken, {
          type : 'text', text : "Tugas berhasil dihapus!"
        });
      }
      catch(error){
        throw new Error("Error!");
      }
    }
    delete_tugas();
  }
  if(incomingMessage[0] === '/help'){
    const help = "[COMMAND LIST]\n\n/tugas : menampilkan list tugas\n\n[ADMIN ONLY]\n\n/tugas_post : menambah tugas (overwrite kalo ada yang lama)\n\n/tugas_update : menambah tugas (nggak overwrite, tapi append ke yang ada)\n\n/tugas_delete : menghapus tugas\n\n";
    return client.replyMessage(event.replyToken, {
      type : 'text', text : help
    });
  }

}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
