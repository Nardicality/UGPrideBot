const discord = module.require("discord.js");
var successFooterWords = ['Bingo!', 'The answer is Yes.', 'Hey it works!', 'This is done.', 'かしこまりました。', 'はい!']
var successFooter = successFooterWords[Math.floor(Math.random() * successFooterWords.length)];
module.exports.run = async (bot, message, args) => {
	let target = message.mentions.users.first() || message.author;
	var genAvatar = new discord.RichEmbed()
		.setColor(0x7289da)
		.setDescription("Generating Avatar")
		.setTitle(`Generating ${target.username}#${target.discriminator}'s avatar`)
		.setFooter(`'${successFooter}' This nibba hawt!`)
	let msg = await message.channel.send({ embed: genAvatar });
	var avatarEmbed = new discord.RichEmbed()
		.setColor(0x7289da)
		.setThumbnail(target.displayAvatarURL)
		.setTitle(`${target.username}#${target.discriminator}'s avatar`)
		.setFooter(`'${successFooter}' This nibba hawt!`)
	await message.channel.send({
		embed: avatarEmbed
	});
	msg.delete();
}

module.exports.help = {
	name: "avatar",
	description: "Shows the avatar of the target.",
	usage: ";avatar [@someone]"
}