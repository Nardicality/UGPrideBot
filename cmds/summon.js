const player = require('../utils/player');

exports.run = async function(bot, message, args) {
  if (!message.member.voiceChannel) return message.channel.send(`You need to be in a voice channel!`)
  if (bot.voiceChannel) return message.channel.send(`I'm already inside a voice channel!`)
  message.member.voiceChannel.join();
};

exports.help = {
  name: 'summon',
  description: 'summon the playlist.',
  usage: 'summon'
};