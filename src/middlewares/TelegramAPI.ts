import * as TelegramBot from 'node-telegram-bot-api';
import * as config from '../config/config.json';



// tslint:disable: no-console
export class TelegramAPI {
  token:string;
  bot:TelegramBot;
  constructor(){
    this.token = config.telegramApiToken;
    this.bot = new TelegramBot(this.token, {polling: true});
  }
  public init():void{
    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(chatId, 'Received your message');
    });
    const options:object = {
      'reply_markup': {
          'keyboard': [['Yes', 'No']],
          'one_time_keyboard': true
          }
      };
    this.bot.onText(/\/keyboard (.+)/, (msg, match) => {

      this.bot.sendMessage(msg.chat.id, 'Welcome', options,);
    });

    this.bot.onText(/\/echo (.+)/, (msg, match) => {
      console.log('MESSAGE');
      const chatId = msg.chat.id;
      const resp = (match !== null)? match[1]:'';
      this.bot.sendMessage(chatId, resp,{
        reply_markup: {
            remove_keyboard: true
        }
      });
    });
  }
  public sendRequest():object{
    return { msg:'done by TELEGRAM!' };
  }
}