const Discord = require('discord.js');

const concatQueueTitles = queue => {
  return queue.map(elem => `${elem.title}\n`).join('');
};

exports.run = function(bot, message, args) {
  const playlist = bot.playlist;
  if (!playlist.queue.length) {
    return message.channel.send('No songs in queue');
  }
  let description = concatQueueTitles(playlist.queue);
  const embed = new Discord.RichEmbed()
    .setColor(0x588F27)
    .setDescription(description)
    .setTitle('Next Up');
  return message.channel.send({embed});
};

exports.help = {
  name: 'queue',
  description: 'Displays the currently queued songs.',
  usage: 'queue'
};