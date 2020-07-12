//==================================Prerequisites Here==========================
const fs = module.require("fs");
//==================================Command Start Here==========================
module.exports.run = async (bot, message, args) => {
    if(bot.maintenance.maintenanceMode.isEnabled === false) {
    message.channel.send("Maintenance mode has been activated. Bot will only register commands made by Bot Testers.")
    bot.maintenance["maintenanceMode"] = {
		isEnabled: true
    }
    fs.writeFile("./maintenance.json", JSON.stringify(bot.maintenance, null, 4), err => {
    if (err) throw err;
    bot.user.setPresence({
      game: {
        type: "WATCHING",
        name: "out for new changes. [In Maintenance Mode.]"
      },
      status: "idle"
    });
	});
	} else if(bot.maintenance.maintenanceMode.isEnabled === true) {
    message.channel.send("Maintenance mode has been deactivated. Bot will resume to its normal state.")
    bot.maintenance["maintenanceMode"] = {
		isEnabled: false
    }
    fs.writeFile("./maintenance.json", JSON.stringify(bot.maintenance, null, 4), err => {
    if (err) throw err;
    bot.user.setPresence({
      game: { type: "LISTENING", name: "my master, Nardicality#0995" },
      status: "online"
    });
	});
  }
}
//==================================Command Ends Here===========================
module.exports.help = {
	name: "maintenance",
	description: "toggle maintenance mode (only can be used by Nardicality)",
	usage: "maintenance [on/off]"
}