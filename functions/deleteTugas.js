const axios = require("axios");
const firebaseurl = process.env.FIREBASE_URL;

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
