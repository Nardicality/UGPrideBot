const queue2 = new Map();
exports.run = function (bot, message) {
  const playlist = bot.playlist;
  async function shiftPlaylist(){
    if(!playlist.queue[0]) {
      playlist.current = ``
      playlist.stopped = true
      playlist.playing = false
    }
    playlist.dispatcher.end();
  };
  //========
  if (!message.member.voiceChannel) return message.channel.send('You are not in a voice channel!');
  if (!playlist) return message.channel.send('There is nothing playing that I could skip for you.');
  // //for ppl with no permissions

  if (message.member.hasPermission("ADMINISTRATOR")) { return shiftPlaylist()}
  else {
    const skipQueue = queue2.get(message.member.voiceChannel.id)
    let userCoun = message.member.voiceChannel.members.size;
    let userCount = Math.ceil(userCoun - 1);
    let required = Math.ceil(userCount * 0.4);
    if (!skipQueue) {
      const skipqueueConstruct = {
        userID: []
      };
      queue2.set(message.member.voiceChannel.id, skipqueueConstruct);
      if (skipqueueConstruct.userID === message.author.id) return message.channel.send(`**You have already requested to skip** (${skipqueueConstruct.userID.length}/${required} people)`)
      skipqueueConstruct.userID.push(message.author.id);
      message.channel.send(`**Skip song?** (${skipqueueConstruct.userID.length}/${required} people)`)
    } else {
      if (skipQueue.userID === message.author.id) return message.channel.send(`**You have already requested to skip** (${skipQueue.userID.length}/${required} people)`)
      skipQueue.userID.push(message.author.id);
      message.channel.send(`**Skip song?** (${skipQueue.userID.length}/${required} people)`)
      if (skipQueue.userID.length >= required) {
        message.channel.send(`Skip Criteria Met. Skipping song...`)
        shiftPlaylist();
        queue2.delete(message.member.voiceChannel.id)
      }
    }
  }
};

exports.help = {
  name: 'skip',
  description: 'Skips to the next song in the queue.',
  usage: 'skip'
};