const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Bot is running.'));
app.listen(3000, () => console.log('Web server running...'));


const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  console.log(`✅ Bot 上線：${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return; // 忽略機器人自己的訊息
  if (message.content === '@everyone') {
    message.channel.send('@everyone');
  }
});

client.on(Events.MessageDelete, (message) => {
  if (message.partial) return; // 有可能刪掉的是還沒完全載入的訊息
  console.log(`${message.author.tag} 刪了訊息：${message.content}`);
});

client.login(token);
