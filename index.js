import 'babel-polyfill'
import { Wechaty, Room, MediaMessage } from 'wechaty'
import apiai from 'apiai'

const fs = require('fs')

const file = fs.createReadStream('images/test.png')


const app = apiai('46a33e7a9cb741fb96e0dcc3d2d03a6c');
const bot = Wechaty.instance();
console.log(bot.sendMedia)

bot.on('scan', (url, code)=>{
  console.log(url);
})
.on('login', user => {
  console.log(`${user} is login`)
})
.on('friend', async function(contact, request){
  if(request){
    await request.accept();
    await contact.say('您好，我是 FCC（freeCodeCamp成都社区）的姜姜姜，很高兴认识你*^_^*回复暗号”FCC成都社区”， 加入FCC成都社区群。直接聊天，请随意…')
    console.log(`${contact.name()}请求加为好友，已接受`)
  }
})
.on('message', async function(m){
  if(m.self()){
    return;
  }


  const fromContact = m.from();
  const fromContent = m.content();
  const room = m.room();
  const noAtMention = fromContent.replace(/@\w+/ig, '');
  let roomTopic;

  const request = app.textRequest(noAtMention, {
    sessionId: '1234567890'
  });

  request.on('error', function(error) {
    console.log(error);
  });

  request.on('response', async function(response) {
    const speech = response.result.fulfillment.speech;
    if(/FCC成都社区/.test(fromContent)){
      let keyroom = await Room.find({topic: 'FreeCodeCamp-成都'});
      if(keyroom){
        await keyroom.add(fromContact);
        await keyroom.say(`欢迎${fromContact.name()}FCC(freecodecamp)成都社区*^_^*`, fromContact)
      }
    }
    m.type() == 10000 && m.say('@Helen')
    if(/jiangjiangjiang/.test(speech)){
      await m.say(new MediaMessage('images/test.jpg'))
    }else{
      m.say(speech)
    }
  })
  request.end();
})
.init()
