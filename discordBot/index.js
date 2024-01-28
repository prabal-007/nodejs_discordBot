// require('dotenv').config();
// const Discord = require('discord.js');
// const axios = require('axios');
// const client = new Discord.Client();
require('dotenv').config(); //initialize dotenv
const { Client, GatewayIntentBits } = require('discord.js')
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        // ...
    ]
})
//const Discord = require('discord.js'); //import discord.js
const axios = require('axios');
//const client = new Discord.Client(); //create new client

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let interval;
client.on('message', async msg => {
  switch(msg.content === 'ping') {
    case "ping":
      msg.reply("Pong!");
      break;
    case "!meme":
      msg.channel.send("Here's your meme!");
      const img = await getMeme();
      msg.channel.send(img);
      break;
    case "!eye":
      msg.channel.send("You are now subscribed to eye reminders.");
       interval = setInterval (function () {
        msg.channel.send("Please take an eye break now!")
        .catch(console.error); 
      }, 3600000); 
      break;
    case "!stop":
      msg.channel.send("I have stopped eye reminders.");
      clearInterval(interval);
      break;
  }
});

async function getMeme(){
  const res = await axios.get('https://memeapi.pythonanywhere.com/');
  console.log(res.data)
  return res.data.memes[0].url;
}


//must be lat line
client.login(process.env.CLIENT_TOKEN);