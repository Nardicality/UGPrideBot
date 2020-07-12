const fs = require("fs");
const discord = require('discord.js');
var successFooterWords = ['Bingo!', 'The answer is Yes.', 'Hey it works!', 'This is done.', 'かしこまりました。', 'はい!']
var successFooter = successFooterWords[Math.floor(Math.random() * successFooterWords.length)];
var errorFooterWords = ['Uh oh...', 'The answer is No.', 'Crap it doesn\'t work!', 'This is incomplete.', 'ごめんなさい ;-;']
var errorFooter = errorFooterWords[Math.floor(Math.random() * errorFooterWords.length)];
var noPerm = new discord.RichEmbed()
		.setDescription("You do not have the permissions to do that!")
		.setColor(0xb30000)
		.setTitle("Error!")
		.setFooter(`'${errorFooter}' no.`)
	var noUser = new discord.RichEmbed()
		.setDescription("You did not specify a user!")
		.setColor(0xb30000)
		.setTitle("Error!")
		.setFooter(`'${errorFooter}' Who the hell am i suppose to unmute? Tell me.`)
	var notMuted = new discord.RichEmbed()
		.setDescription("This user is already muted.")
		.setColor(0xb30000)
		.setTitle("Error!")
		.setFooter(`'${errorFooter}' Thanks for being kind but...`)
	var muteSucc = new discord.RichEmbed()
		.setDescription("I have unmuted that person.")
		.setColor(0x00b300)
		.setTitle("Success!")
		.setFooter(`'${successFooter}' The gods has bestowed mercy upon you.`)
var notMuted = new discord.RichEmbed()
.setDescription("This user was not muted.")
.setColor(0xb30000)
.setTitle("Error!")
.setFooter("Bot made by Nardicality#0995")

module.exports.run = async (bot, message, args) => {
	if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send({embed: noPerm});

	let toMute = message.mentions.members.first() || message.guild.members.get(args[0]);
	if(!toMute) return message.channel.send({embed: noUser});

	let role = message.guild.roles.find(r => r.name === "Muted");

	if(!role || !toMute.roles.has(role.id)) return message.channel.send({embed: notMuted});

	await toMute.removeRole(role);

	delete bot.mutes[toMute.id];

	fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
		if(err) throw err;
		console.log(`I have unmuted ${toMute.user.tag}.`);
		message.channel.send({embed: muteSucc});
	});
}

module.exports.help = {
	name: "unmute",
	description: "Mercy for the wrong doers :)",
	usage: ";unmute (target)"
}