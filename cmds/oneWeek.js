//==================================Prerequisites Here==========================

const Discord = module.require("discord.js");
const moment = require("moment");
//==================================Command Start Here==========================
module.exports.run = async (bot, message, args) => {
let user;
let usedID;
if (message.mentions.users.first()) {
    usedID = false;
    user = message.mentions.users.first();
    const member = message.guild.member(user);
    var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(user.displayAvatarURL)
        .setAuthor(user.username, user.displayAvatarURL)
        .addField(`${user.tag}`, `${user}`, true)
        .addField("ID:", `${user.id}`, true)
        .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
        .addField("Status:", `${user.presence.status}`, true)
        .addField("In Server", message.guild.name, true)
        .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField("Bot:", `${user.bot}`, true)
        .addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, Do MMMM YYYY")}`, true)
        .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, Do MMMM YYYY")}`, true) 
        .addField("Roles:", member.roles.map(roles => `${roles}`).join(', '), true)
        .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
    message.channel.send({embed});
} else if (message.guild.members.find(r => r.id === args[0])) {
    usedID = true; 
    user = message.guild.members.find(r => r.id === args[0]);
    const member = message.guild.member(user);
    var embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Not available when using ID")
    .addField(`User Tag`, `${user}`, true)
    .addField("ID:", `${user.id}`, true)
    .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
    .addField("Status:", `${user.presence.status}`, true)
    .addField("In Server", message.guild.name, true)
    .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
    .addField("Bot:", `Not available when using ID`, true)
    .addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, Do MMMM YYYY")}`, true)
    .addField("Account Created On:", `Not available when using ID`, true) 
    .addField("Roles:", member.roles.map(roles => `${roles}`).join(', '), true)
    .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
message.channel.send({embed});

} else {
    usedID = false;
    user = message.author;
    const member = message.guild.member(user);
    var embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(user.displayAvatarURL)
        .setAuthor(user.username, user.displayAvatarURL)
        .addField(`${user.tag}`, `${user}`, true)
        .addField("ID:", `${user.id}`, true)
        .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
        .addField("Status:", `${user.presence.status}`, true)
        .addField("In Server", message.guild.name, true)
        .addField("Game:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
        .addField("Bot:", `${user.bot}`, true)
        .addField("Joined The Server On:", `${moment.utc(member.joinedAt).format("dddd, Do MMMM YYYY")}`, true)
        .addField("Account Created On:", `${moment.utc(user.createdAt).format("dddd, Do MMMM YYYY")}`, true) 
        .addField("Roles:", member.roles.map(roles => `${roles}`).join(', '), true)
        .setFooter(`Replying to ${message.author.username}#${message.author.discriminator}`)
    message.channel.send({embed});
}
}
//==================================Command Ends Here===========================
module.exports.help = {
	name: "userinfo",
	description: "description here",
	usage: "usage here"
}