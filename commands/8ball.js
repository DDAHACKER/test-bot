const Discord = require('discord.js');
module.exports.run = async(bot,message,args) => {
  if(!args[2]) return message.channel.send("Please ask a full question!");
  let replies = ['Yes', 'No', 'Ask again later', 'Reply hazy try again later'];
  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(1).join(" ");
  let embed = new Discord.RichEmbed()
  .setFooter(`8ball - ${message.author.tag}`)
  .setColor(0x000000)
  .addField(`Question:`, question)
  .addField(`Answer`, replies[result]);
  message.channel.send(embed)
}
