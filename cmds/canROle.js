//==================================Prerequisites Here==========================

//==================================Command Start Here==========================
module.exports.run = async (bot, message, args) => {
  let adminRole = message.guild.roles.find(r => r.id === "637876078794375178");
  let modRole = message.guild.roles.find(t => t.id === "641625510043975680");
  console.log(message.member.roles.find(r => r.name === "345"));
  if (!message.member.roles.find(r => r.name === "Admins") === null || !message.member.roles.find(t => t.name === "Moderators") === null) return message.channel.send("yes");
  let toMute =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!toMute) {
    message.channel.send("You did not specify a user.");
    return;
  }
  let canRole = message.guild.roles.find(r => r.id === "704925061571674204");
  if (toMute.roles.has(canRole.id)) {
    message.channel.send("User already has the role.");
    return;
  }
  toMute.addRole("704925061571674204");
  message.channel.send("Successfully roled the user! :white_check_mark:");
};
//==================================Command Ends Here===========================
module.exports.help = {
  name: "canrole",
  description: "description here",
  usage: "usage here"
};
