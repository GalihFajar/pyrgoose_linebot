const axios = require('axios');

const postTugas = async (incomingMessage, event, client) => {
    incomingMessage.shift();
    var command = incomingMessage[0];
    incomingMessage.shift();
    var body = incomingMessage.join(" ");
    var posted = {
      [command] : body
    };
    try{
        await axios.patch('https://pyrgoose.firebaseio.com/tugas.json', posted);
        return client.replyMessage(event.replyToken, {
          type : 'text', text : "Tugas berhasil ditambahkan"
        })
    }catch(error){
        console.log(error);
    }
}

module.exports = postTugas;