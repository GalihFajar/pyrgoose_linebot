const getuid = (event, client) => {
    return client.replyMessage(event.replyToken, {
        type : 'text', text : event.source.userId
      });
};

module.exports = getuid;