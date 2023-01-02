import { Client, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv';
import record from './commands/record/record.js';

dotenv.config();

//Config constant
const token = process.env.TOKEN;
const prefix = '-';

//Create Client Object
const client = new Client( { intents: [ GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages ] } );

client.on('ready', () => { console.log('Bot Started') } );

//Check For Message
client.on('messageCreate', (message) => {
    //Is Command?
    const userText = message.content;
    if (!userText.startsWith(prefix)) return;

    //RemoveFirstletterThenSplit
    const args = userText.replace(prefix, '').split(" ");

    //Commands
    if (args[0] == 'record') {
        switch(args[1]) {
            case 'add':
                record.add(args.slice(2).join(', '));
                break;
            case 'list':
                record.list();
                break;
            case 'date':
                record.date();
                break;
            default :
                message.channel.send('Please Check Your Option');
        };
    };

});

//Login to bot
client.login(token);
