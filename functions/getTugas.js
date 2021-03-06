const axios = require("axios");
const firebaseurl = process.env.FIREBASE_URL;

const getTugas = async (event, client) => {
  try {
    const response = await axios.get(`${firebaseurl}tugas.json`);
    var msgStr = "";
    Object.keys(response.data).forEach((key) => {
      if (msgStr === "") {
        msgStr =
          "[LIST TUGAS]\n\n" + "[" + key + "]" + "\n" + response.data[key];
      } else {
        msgStr =
          msgStr + "\n" + "\n" + "[" + key + "]" + "\n" + response.data[key];
      }
    });
    return client.replyMessage(event.replyToken, {
      type: "text",
      text: msgStr,
    });
  } catch (err) {
    new Error("Cannot get tugas!");
  }
};

module.exports = getTugas;
