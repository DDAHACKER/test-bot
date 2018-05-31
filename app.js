const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
let prefix = "tb."
bot.on("ready", async() => {
  console.log("tb. is online");
});
bot.on("message", async message => {
  if(message.author.id === bot.id) return;
  let prefixes = JSON.parse(fs.readFileSync('./storage/prefixes.json', 'utf8'));
  if(!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: prefix
    };
  }
  prefix = prefixes[message.guild.id].prefixes;
  let msg = message.content.toLowerCase();
  let sender = message.author;
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();
  if(!msg.startsWith(prefix)) return;
  try {
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(bot,message,args);
  } catch (e) {
    console.log(e.message)
  } finally
 {
   console.log(`${message.author.tag} ran the command ${cmd}`);
 }
  if(msg === `${prefix}ping`) {
    message.channel.send('Pong...').then((msg) => {
      let embed = new Discord.RichEmbed()
      .addField(`<:ping:451547437375684630> Latency: `, `${msg.createdTimestamp - message.createdTimestamp}ms`)
      .addField(`<:botheartbeat:451547979745198080> HeartBeat: `, `${Math.round(bot.ping)}ms`)
      msg.edit(embed);
    });
  }
});
bot.login(process.env.token);
