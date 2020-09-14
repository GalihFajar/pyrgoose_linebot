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

  // create a echoing text message
  if(incomingMessage[0] === '/echo'){
    return client.replyMessage(event.replyToken, {
      type : 'text', text : incomingMessage[1]
    });
  }
  if(incomingMessage[0] === '/tugas'){
    const return_tugas = async () => {
      try{
        const response = await axios.get("https://pyrgoose.firebaseio.com/tugas.json");
        console.log(typeof response);
        console.log("++++ diatas responsenya +++++");
        return client.replyMessage(event.replyToken, {
          type : 'text', text : "bisa ga sih gan elah"
        });
      }
      catch(err){ 
        new Error("Cannot get tugas!")
      }
    }
    return_tugas();
  }
  if(incomingMessage[0] === '/tugas_post'){
    incomingMessage.shift();
    var command = incomingMessage[0];
    incomingMessage.shift();
    var body = incomingMessage.join(" ");
    var posted = {
      [command] : body
    };
    console.log(command);
    console.log(body);
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
  // const echo = { type: 'text', text: event.message.text };

  // // use reply API
  // return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
