const deleteTugas = async (event, client) => {
  try {
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
