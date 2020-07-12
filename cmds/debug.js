//==================================Prerequisites Here==========================


//==================================Command Start Here==========================
module.exports.run = async (bot, message, args) => {
  if(args[0] === "bot") {
    let playlist = bot.playlist;
message.channel.send(`__**Bot Debug Results**__\n1. playlist.queue= ${playlist.queue}\n2. playlist.stopped= ${playlist.stopped}\n3. playlist.playing= ${playlist.playing}\n4. playlist.current= ${playlist.current}`)

  } else return;
}
//==================================Command Ends Here===========================
module.exports.help = {
	name: "debug",
	description: "description here",
	usage: "usage here"
}