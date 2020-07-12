exports.run = function(bot, message) {
  const playlist = bot.playlist;
  if (playlist.dispatcher) {
    playlist.stopped = true;
    playlist.playing = false;
    playlist.dispatcher.end();
    bot.voiceChannel.leave()
    message.channel.send('Playlist stopped.');
  }
};

exports.help = {
  name: 'stop',
  description: 'Stops the playlist until the resume command is used.',
  usage: 'stop'
};

// playlist.queue.forEach(song => {
//   playlist.queue.splice(i, 1);
// });