import 'babel-polyfill'
import { Wechaty, Room } from 'wechaty'
import apiai from 'apiai'

const app = apiai('00f9824dcbcd4c4bb08c02fb6b319343');
const bot = Wechaty.instance();

bot.on('scan', (url, code)=>{
  console.log(url);
})
.on('login', user => {
  console.log(`${user} is login`)
})
.on('friend', async function(contact, request){
  if(request){
    await request.accept();
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
    if(/大妹最可爱/.test(fromContent)){
      let keyroom = await Room.find({topic: '大妹最可爱'});
      if(keyroom){
        await keyroom.add(fromContact);
        await keyroom.say(`大妹最爱${fromContact.name()}`, fromContact)
      }
    }
    m.say(speech);
  })
  request.end();
})
.init()
