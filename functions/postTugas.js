const axios = require("axios");
const firebaseurl = process.env.FIREBASE_URL;

const postTugas = async (incomingMessage, event, client) => {
  incomingMessage.shift();
  var command = incomingMessage[0];
  incomingMessage.shift();
  var body = incomingMessage.join(" ");
  var posted = {
    [command]: body,
  };
  try {
    await axios.patch(`${firebaseurl}tugas.json`, posted);
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "Tugas berhasil ditambahkan",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = postTugas;
