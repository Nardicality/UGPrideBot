//==================================Prerequisites Here==========================



//==================================Command Start Here==========================
module.exports.run = async (bot, message, args) => {
let twitchAccess = message.guild.roles.find(r => r.id === "706809777761812550")
if (message.member.roles.find(r => r.id === "706809777761812550") === null ) {
 message.channel.send("You do not have access to the email.")
  return;
}
message.channel.send("Access Granted! Check your DMs for the credentials.")
message.author.send("**Email Credentials**")
message.author.send("User: ugpridecontact@gmail.com")
message.author.send("Password: iloveUGPRIDE")
}
//==================================Command Ends Here===========================
module.exports.help = {
	name: "emailcreds",
	description: "description here",
	usage: "usage here"
}