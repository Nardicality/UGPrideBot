const YTDL = require("ytdl-core");
let playlist;

const shiftPlaylist = () => {
  playlist.current = playlist.queue[0].title;
  playlist.playing = true;
  playlist.queue.shift();
};

async function play(bot, message) {
  //=============VC IDS=================
  const voiceChannel1 = "637822723585736760";
  const voiceChannel2 = "640850187845238785";
  const voiceChannel3 = "641678635073536029";
  const voiceChannel4 = "641695877794103335";
  const voiceChannel5 = "638375764126990348";
  //============Find which bot to join.===============
  if (!message.member.voiceChannel) return;
  if (!bot.voiceConnection) {
    await message.member.voiceChannel.join()
      .then(connection => {
        bot.voiceConnection = connection;
      })
      .catch(console.error);
  }

  const stream = YTDL(playlist.queue[0].link, { filter: "audioonly" });
  playlist.dispatcher = bot.voiceConnection.playStream(stream);
  message.channel.send(`Now playing: ${playlist.queue[0].title}`);
  shiftPlaylist();

  playlist.dispatcher.on("end", () => {
    if (playlist.stopped) return;
    if (playlist.queue.length) setTimeout(() => play(bot, message), 500);
    // prevent dispatcher race condition
    else {
      if (!playlist.queue.length)
        return message.channel.send("No songs in queue");
      playlist.current = "";
      playlist.playing = false;
    }
  });
}

module.exports = function(bot, message) {
    playlist = bot.playlist;
    play(bot, message);
};
