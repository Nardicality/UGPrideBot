const discord = module.require("discord.js");
var successFooterWords = ['Bingo!', 'The answer is Yes.', 'Hey it works!', 'This is done.', 'かしこまりました。', 'はい!']
var successFooter = successFooterWords[Math.floor(Math.random() * successFooterWords.length)];
var errorFooterWords = ['Uh oh...', 'The answer is No.', 'Crap it doesn\'t work!', 'This is incomplete.', 'ごめんなさい ;-;']
var errorFooter = errorFooterWords[Math.floor(Math.random() * errorFooterWords.length)];
var noSpecify = new discord.RichEmbed()
	.setColor(0x7289da)
	.setDescription(`You did not specify the amount of messages to purge`)
	.setTitle(`Error!`)
	.setFooter(`'${errorFooter}' How the hell am I suppose to know what you want purged!? :thinking:`)
var tooLow = new discord.RichEmbed()
	.setColor(0x7289da)
	.setDescription(`The number you specified has to be 1 or higher.`)
	.setTitle(`Error!`)
	.setFooter(`'${errorFooter}' How the hell am I suppose to purge 0 messages!? :thinking:`)
module.exports.run = async (bot, message, args) => {
	function sleep(ms){
		return new Promise(resolve=>{
			setTimeout(resolve,ms)
		})
	}
	let target = args[0];
	var giveNumber = new discord.RichEmbed()
		.setColor(0x7289da)
		.setDescription(`You did not specify a number.`)
		.setTitle(`Error!`)
		.setFooter(`'${errorFooter}' How the hell am I suppose to purge "${args.join(" ")}" messages? :thinking:`)
	if (target.isNaN === true) { return message.channel.send({ embed: giveNumber }) }
	if (!target) { return message.channel.send({ embed: noSpecify }) } else if (target <= 0) { return message.channel.send({ embed: tooLow }) }
	var purgeMsg = new discord.RichEmbed()
		.setColor(0x7289da)
		.setDescription(`Purging ${target} messages.`)
		.setTitle(`Purging ${args[0]} messages.`)
		.setFooter(`'${successFooter}' Clearing the dungeons...`)
	var purgeMsg2 = new discord.RichEmbed()
		.setColor(0x7289da)
		.setDescription(`Purged ${target} messages.`)
		.setTitle(`Purged ${args[0]} messages.`)
		.setFooter(`'${successFooter}' Cleared the dungeons...`)
	let msg = await message.channel.send({embed: purgeMsg})
	message.channel.bulkDelete(target, true)
	msg.delete()
	let msg2 = await message.channel.send({embed: purgeMsg2})
	await sleep(10000)
	msg2.delete()
}
module.exports.help = {
	name: "purge",
	description: "Purges the past messages.",
	usage: ";purge (amount of messages to delete)"
}