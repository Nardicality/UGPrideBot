//==================================Prerequisites Here==========================

//==================================Command Start Here==========================
module.exports.run = async (bot, message, args) => {
  let roleChannel = message.guild.channels.get("638365856476299264")
  if (message.channel.id !== "638365856476299264") {
    let onlyRole = await message.reply(`You can only role yourself in ${roleChannel}`)
    onlyRole.delete(5000)
    message.delete(500)
    return;
  };
  let toRole1 = message.author.id;
  let toRole = message.guild.members.get(toRole1);
  message.delete(500);
  if (!args[0]) {
    let specifyRole = await message.channel.send(
      `You did not specify a role. Look at the top OR in pinned messages to see the list of roles.`
    );
    specifyRole.delete(5000);
    return;
  }
  let needRole = args[0].toUpperCase();
  console.log(needRole);
  if (needRole === "NPCC") {
    toRole.addRole(
      message.guild.roles.find(a => a.id === "638043089667358730")
    );
    let roleAdded = await message.channel.send(`Role added.`);
    message.member.removeRole("704925061571674204")
    roleAdded.delete(5000);
  } else if (needRole === "NCC") {
    toRole.addRole(
      message.guild.roles.find(b => b.id === "638042947929112577")
    );
    let roleAdded = await message.channel.send(`Role added.`);
    message.member.removeRole("704925061571674204")
    roleAdded.delete(5000);
  } else if (needRole === "NCDCC") {
    toRole.addRole(
      message.guild.roles.find(c => c.id === "638043169912520735")
    );
    let roleAdded = await message.channel.send(`Role added.`);
    message.member.removeRole("704925061571674204")
    roleAdded.delete(5000);
  } else if (needRole === "SJB") {
    toRole.addRole(
      message.guild.roles.find(d => d.id === "638043050010083328")
    );
    let roleAdded = await message.channel.send(`Role added.`);
    message.member.removeRole("704925061571674204")
    roleAdded.delete(5000);
  } else if (needRole === "COM") {
    toRole.addRole(
      message.guild.roles.find(e => e.id === "638375020392873994")
    );
    let roleAdded = await message.channel.send(`Role added.`);
    message.member.removeRole("704925061571674204")
    roleAdded.delete(5000);
  } else if (needRole === "SCOUTS") {
    toRole.addRole(
      message.guild.roles.find(f => f.id === "638043230109302823")
    );
    let roleAdded = await message.channel.send(`Role added.`);
    message.member.removeRole("704925061571674204")
    roleAdded.delete(5000);
  } else if (needRole === "GB") {
    toRole.addRole(
      message.guild.roles.find(g => g.id === "638043129567772693")
    );
    let roleAdded = await message.channel.send(`Role added.`);
    message.member.removeRole("704925061571674204")
    roleAdded.delete(5000);
  } else if (needRole === "BB") {
    toRole.addRole(
      message.guild.roles.find(h => h.id === "638043337018048543")
    );
    let roleAdded = await message.channel.send(`Role added.`);
    message.member.removeRole("704925061571674204")
    roleAdded.delete(5000);
  } else if (needRole === "GG") {
    toRole.addRole(
      message.guild.roles.find(i => i.id === "638042877750149120")
    );
    let roleAdded = await message.channel.send(`Role added.`);
    message.member.removeRole("704925061571674204")
    roleAdded.delete(5000);
  } else if (needRole === "RCY") {
    toRole.addRole(
      message.guild.roles.find(j => j.id === "638043277639286786")
    );
    let roleAdded = await message.channel.send(`Role added.`);
    message.member.removeRole("704925061571674204")
    roleAdded.delete(5000);
  } else {
    let validRole = await message.channel.send(
      `You have not entered a valid role. Please look at the top OR pinned messages for the list of roles.`
    );
    validRole.delete(5000);
    return;
  }
};
//==================================Command Ends Here===========================
module.exports.help = {
  name: "role",
  description: "description here",
  usage: "usage here"
};
