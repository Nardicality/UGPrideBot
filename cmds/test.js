//==================================Prerequisites Here==========================

//==================================Command Start Here==========================
module.exports.run = async (bot, message, args) => {
	if(message.author.id === "219076112972644352") {
		return message.channel.send("boi what")
	}
}
//==================================Command Ends Here===========================
module.exports.help = {
	name: "test",
	description: "description here",
	usage: "usage here"
}