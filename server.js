botSettings = require("./botsettings.json")
const token = botSettings.token
const Discord = require("discord.js");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const prefix = ";";
const http = require("http");
const app = express();
const maintenanceMode = require("./maintenance.json");

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

const bot = new Discord.Client({ disableEveryone: false });
bot.commands = new Discord.Collection();
bot.mutes = require("./mutes.json");
bot.maintenance = require("./maintenance.json");
bot.playlist = {
  queue: [],
  nowPlaying: "",
  stopped: false
};
fs.readdir("./cmds/", (err, files) => {
  if (err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) {
    console.log("No commands to load!");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands!`);

  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", () => {
  console.log(`Bot is ready! ${bot.user.username}`);
  bot.setInterval(() => {
    for (let i in bot.mutes) {
      let time = bot.mutes[i].time;
      let guildId = bot.mutes[i].guild;
      let guild = bot.guilds.get(guildId);
      let member = guild.members.get(i);
      let mutedRole = guild.roles.find(r => r.name === "Muted");
      if (!mutedRole) continue;
      if (Date.now() > time) {
        console.log(`${i} is now able to be unmuted!`);
        member.removeRole(mutedRole);
        delete bot.mutes[i];

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
          if (err) throw err;
          console.log(`I have unmuted ${member.user.tag}.`);
        });
      }
    }
  }, 5000);
  if(maintenanceMode.maintenanceMode.isEnabled === undefined) {return;}
  else if (maintenanceMode.maintenanceMode.isEnabled === true) {
    bot.user.setPresence({
      game: {
        type: "WATCHING",
        name: "out for new changes. [In Maintenance Mode.]"
      },
      status: "idle"
    });
  } else {
    bot.user.setPresence({
      game: { type: "LISTENING", name: "my master, Nardicality#0995" },
      status: "online"
    });
  }
});

bot.on("guildMemberAdd", member => {
  const doorStep2 = member.guild.channels.find(x => x.id === "637822723585736757");
  const rolesChannel = member.guild.channels.find(
    x => x.id === "638365856476299264"
  );
  const rulesChannel = member.guild.channels.find(
    x => x.id === "638607156018413598"
  );
  if (doorStep2) {
    try {
      doorStep2.send(
        `Welcome to UGPRIDE, ${member}! Please go to ${rulesChannel} and read the rules **FIRST.** There after head to ${rolesChannel} to role yourself. We hope you enjoy your stay here!`
      );
    } catch (e) {
      console.warn(e.stack);
    }
  }
  member.send(
    `Welcome to UGPRIDE, ${member}! Please go to ${rulesChannel} and read the rules **FIRST.** There after head to ${rolesChannel} to role yourself. We hope you enjoy your stay here!`
  );
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const guild = bot.guilds.get("637822723585736754");
  const member = guild.members.get(message.author.id);
  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);
  if (!command.startsWith(prefix)) {
    return;
  }
  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(bot, message, args);
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  const guild = bot.guilds.get("637822723585736754");
  const member = message.author.id;
  const guildMember = guild.members.get(member);
  let adminRole = message.guild.roles.find(r => r.id === "637876078794375178");
  let modRole = message.guild.roles.find(t => t.id === "641625510043975680");
  let rolesChannel = message.guild.channels.get("638365856476299264")
  let doorStep = message.guild.channels.get("637822723585736757")
  if (message.channel.id !== "638365856476299264")
    return;
  if (message.content.startsWith(";role")) return;
  if (
    !message.member.roles.find(r => r.id === "637876078794375178") === null ||
    !message.member.roles.find(t => t.id === "641625510043975680") === null
  ) return;
  if (message.content.startsWith(";")) {
  message.delete()
    let wrongCommand = await message.channel.send("You have entered an invalid command! Please read the instructions at the top on how to role yourself!")
    wrongCommand.delete(5000)
    return;
  }
  message.delete()
  let cannotSnd = await message.channel.send(`You are not allowed to talk in ${rolesChannel}! Please direct your message to ${doorStep}.`)
  cannotSnd.delete(5000)
  console.log("success");
});

//=======subbot 1=========
//const subbot = new Discord.Client({disableEveryone: false});
//subbot.playlist = {
//  queue: [],
//  nowPlaying: "",
//  stopped: false
//};
//subbot.on("ready", () => {
//  console.log(`Bot is ready! ${subbot.user.username}`);
//  if(maintenanceMode.maintenanceMode.isEnabled === true) {
//  subbot.user.setPresence({
//    game: { type: "WATCHING", name: "out for new changes. [In Maintenance Mode.]" },
//    status: "idle"
//  });
//  } else {
//      subbot.user.setPresence({
//    game: { type: "LISTENING", name: "my master, Nardicality#0995" },
//    status: "online"
// });
//  }
//});

module.exports = router;
//subbot.login(SUBTOKEN1);
bot.login(token);
