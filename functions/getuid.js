const getuid = (event) => {
    return client.replyMessage(event.replyToken, {
        type : 'text', text : event.source.userId
      });
};

export default getuid;