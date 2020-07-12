exports.run = function(bot, message) {
  if(!message.member.hasPermissions("PRIORITY_SPEAKER")) return message.channel.send(`You have insufficient permissions to do that.`)
  const playlist = bot.playlist;
  playlist.queue = [];
  message.channel.send('Queue has been cleared.');
};

exports.help = {
  name: 'clear',
  description: 'Clears the playlist queue.',
  usage: 'clear'
};
