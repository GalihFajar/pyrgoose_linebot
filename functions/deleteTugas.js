const axios = require("axios");
const firebaseurl = require("../index").firebaseurl;

const deleteTugas = async (incomingMessage, event, client) => {
  try {
    console.log(firebaseurl, " INI FIREBASE URL");
    await axios.delete(
      `https://pyrgoose.firebaseio.com/tugas/${incomingMessage[1]}.json`
    );
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: "Tugas berhasil dihapus!",
    });
  } catch (error) {
    throw new Error("Error!");
  }
};

module.exports = deleteTugas;
