const player = require('../utils/player');

exports.run = function(bot, message) {
  const playlist = bot.playlist;
  if (!playlist.queue.length) return message.channel.send('No songs in queue');
  if (!bot.voiceConnection) return message.member.voiceChannel.join();
  playlist.stopped = false;
  player(bot, message);
  message.channel.send('Playlist resumed.');
};

exports.help = {
  name: 'resume',
  description: 'Resumes the playlist.',
  usage: 'resume'
};