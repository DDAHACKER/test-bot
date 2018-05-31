const Discord = require('discord.js');
const fs = require('fs');
module.exports.run = async(bot,message,args) => {
  if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("You are not allowed to use this command!");
  if(!args[0] || args[0 === "help"]) return message.channel.send("**Usage: tb.prefix <desired prefix>**");
  let prefixes = JSON.parse(fs.readFileSync("../storage/prefixes.json", "utf8"));
  prefixes[message.guild.id] = {
    prefixes: args[0];
  };
  fs.writeFile("../storage/prefixes.json", JSON.stingify(prefixes), (err) => {
    if(err) console.log(err);
  });
  let embed = new Discord.RichEmbed()
  .setColor(0xff9900)
  .setFooter(`Prefix Change - ${message.author.tag}`)
  .setDescription(`**Prefix now set to ${args[0]}**`);
  message.channel.send(embed);
}
