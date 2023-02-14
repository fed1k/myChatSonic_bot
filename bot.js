const TelegramBot = require('node-telegram-bot-api');
const sdk = require('api')('@writesonic/v2.2#4enbxztlcbti48j');
sdk.auth('09764226-ec28-44ea-b427-63417c054ac9');
// replace the value below with the Telegram token you receive from @BotFather
const token = '6030547518:AAHdfTPTBDOEZGnmeE4CT6exC6z7gQJXnhA';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"
  // console.log(" asdasdasd");

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  // console.log(msg.text);


  sdk.chatsonic_V2BusinessContentChatsonic_post({
    enable_google_results: 'true',
    enable_memory: false,
    input_text: msg.text
  }, {engine: 'premium'})
    .then(({ data }) => bot.sendMessage(chatId, data.message))
    .catch(err => console.error(err));
  // console.log(msg.text);
  // 

  // send a message to the chat acknowledging receipt of their message
  // ;
});