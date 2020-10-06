const axios = require("axios");

const updateTugas = async (incomingMessage, event, client) => {
  incomingMessage.shift();
  var command = incomingMessage[0];
  incomingMessage.shift();
  var body = incomingMessage.join(" ");
  try {
    var current_tugas = await axios.get(
      "https://pyrgoose.firebaseio.com/tugas.json"
    );
    current_tugas = current_tugas.data[command];
    const posted = {
      [command]: current_tugas + "\n" + body,
    };
    await axios.patch("https://pyrgoose.firebaseio.com/tugas.json", posted);
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "Tugas berhasil ditambahkan!",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = updateTugas;
