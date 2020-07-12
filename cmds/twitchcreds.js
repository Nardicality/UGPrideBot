//==================================Prerequisites Here==========================



//==================================Command Start Here==========================
module.exports.run = async (bot, message, args) => {
let twitchAccess = message.guild.roles.find(r => r.id === "706809818115211294")
if (message.member.roles.find(r => r.id === "706809818115211294") === null ) {
 message.channel.send("You do not have access to the twitch account.")
  return;
}
message.channel.send("Access Granted! Check your DMs for the credentials.")
message.author.send("**Twitch Credentials**")
message.author.send("User: ugpridesg")
message.author.send("Password: SG_UGpride_123")
}
//==================================Command Ends Here===========================
module.exports.help = {
	name: "twitchcreds",
	description: "description here",
	usage: "usage here"
}