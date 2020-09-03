import http = require('request-promise-native');
import { Logger, getLogger } from "log4js";
import { to, logToFile, escapeHtml } from '../../shared-helpers';
import { ITelegramService } from './ITelegramService';
var logger:Logger = getLogger();

export class TelegramService implements ITelegramService {
    async sendTelegram(text: string, chatId?:string) : Promise<boolean> {
        
        //how to get the chat id
        //https://stackoverflow.com/questions/33858927/how-to-obtain-the-chat-id-of-a-private-telegram-channel
        //https://api.telegram.org/bot**YourBOTToken**/getUpdates
        
        chatId = chatId || process.env.POKER_TELEGRAM_ADMIN_CHANNEL;
        let body = {            
            "chat_id" : chatId,            
            "text" : text,      
            "disable_web_page_preview" : true,
            "parse_mode" : "HTML" 
          }
        let token = process.env.POKER_TELEGRAM_ADMIN_BOT_TOKEN;//get the BOT TOKEN from bot father
        let url = `https://api.telegram.org/bot${token}/sendMessage`; 
        
        let sent:boolean = true;
        await http.post({ uri: url, body: body, json:true })
        .catch((e:any)=>{
            console.error(e);
            logToFile('application.log', `TelegramService! ${e}`);
            sent = false;
        })
        return sent;
        
        
      }
}