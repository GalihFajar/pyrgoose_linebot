const creatememe = (event, client) => {
  const incomingMessage = event.message.text.split(" ");
    if(incomingMessage[1] === '-h'){
        return client.replyMessage(event.replyToken, {
          type : 'text', text : "/creatememe <jenismeme> <text1>,<text2>\n"
        });
      }
      incomingMessage.shift();
      var memeType = incomingMessage[0];
      incomingMessage.shift();
      var text = incomingMessage.join(' ');
      text = text.split(',');
      const text0 = text[0];
      const text1 = text[1];
      if(memeID[memeType] === undefined){
        return client.replyMessage(event.replyToken, {
          type : 'text', text : 'Meme is not available'
        });
      }
      const input = {
        template_id: memeID[memeType],
        username: "elf3_",
        password: "299792458"
      };
      if(text0){
        input['text0'] = text0; 
      }
      if(text1){
        input['text1'] = text1;
      }
      const params = new URLSearchParams(input).toString();
      const create_meme = async () => {
        try{
          const response = await axios.post(`https://api.imgflip.com/caption_image?${params}`);
          return client.replyMessage(event.replyToken, {
            type : 'image', originalContentUrl : response.data.data.url, previewImageUrl : response.data.data.url
          });
        }
        catch(error){ 
          throw new Error("Error!");
        }
      }
}

module.exports = creatememe;