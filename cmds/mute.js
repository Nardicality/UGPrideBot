const fs = module.require("fs");
const discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
  var successFooterWords = [
    "Bingo!",
    "The answer is Yes.",
    "Hey it works!",
    "This is done.",
    "かしこまりました。",
    "はい!"
  ];
  var successFooter =
    successFooterWords[Math.floor(Math.random() * successFooterWords.length)];
  var errorFooterWords = [
    "Uh oh...",
    "The answer is No.",
    "Crap it doesn't work!",
    "This is incomplete.",
    "ごめんなさい ;-;"
  ];
  var errorFooter =
    errorFooterWords[Math.floor(Math.random() * errorFooterWords.length)];
  var noPerm = new discord.RichEmbed()
    .setDescription("You do not have the permissions to do that!")
    .setColor(0xb30000)
    .setTitle("Error!")
    .setFooter(
      `'${errorFooter}' Hey buddy! Looks like you want to be a moderator! Mod positions ain't open right now though...`
    );
  var oofCunt = new discord.RichEmbed()
    .setDescription(
      "You cannot mute a member who is higher or has the same role as you."
    )
    .setColor(0xb30000)
    .setTitle("Error!")
    .setFooter(`'${errorFooter}' Nice try but nope :P That guy's a superior.`);
  var muteYourself = new discord.RichEmbed()
    .setDescription("You cannot mute yourself.")
    .setColor(0xb30000)
    .setTitle("Error!")
    .setFooter(
      `'${errorFooter}' We know you are a masochist but don't go muting yourself...`
    );
  var noUser = new discord.RichEmbed()
    .setDescription("You did not specify a user!")
    .setColor(0xb30000)
    .setTitle("Error!")
    .setFooter(`'${errorFooter}' Who the hell am i suppose to mute? Tell me.`);
  var alrMuted = new discord.RichEmbed()
    .setDescription("This user is already muted.")
    .setColor(0xb30000)
    .setTitle("Error!")
    .setFooter(
      `'${errorFooter}' We know you are a sadist but don't go double muting people...`
    );
  var muteSucc = new discord.RichEmbed()
    .setDescription("I have muted that person.")
    .setColor(0x00b300)
    .setTitle("Success!")
    .setFooter(`'${successFooter}' Too bad... Get rekt :))))))))`);
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send({ embed: noPerm });
  let toMute =
    message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!toMute) return message.channel.send({ embed: noUser });
  if (toMute.id === message.author.id)
    return message.channel.send({ embed: muteYourself });
  if (toMute.highestRole.position >= message.member.highestRole.position)
    return message.channel.send({ embed: oofCunt });

  let role = message.guild.roles.find(r => r.name === "Muted");
  if (!role) {
    try {
      role = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions: []
      });

      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }

  if (toMute.roles.has(role.id))
    return message.channel.send({ embed: alrMuted });

  bot.mutes[toMute.id] = {
    guild: message.guild.id,
    time: Date.now() + parseInt(args[1]) * 1000
  };

  await toMute.addRole(role);

  fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
    if (err) throw err;
    message.channel.send({ embed: muteSucc });
  });
};

module.exports.help = {
  name: "mute",
  description: "Punishes the wrong doers >:)",
  usage: ";mute [time] (@someone)"
};
