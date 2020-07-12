//==================================Prerequisites Here==========================

const player = require('../utils/player');
const ytdl = require('ytdl-core');
const Util = require('discord.js');
const YouTube = require('simple-youtube-api');
const botSettings = require("../botsettings.json")
const GOOGLE_API_KEY = botSettings.GOOGLE_API_KEY;
const SPOTIFY_API_KEY = botSettings.SPOTIFY_API_KEY;
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();

//==================================Command Start Here==========================
module.exports.run = async (bot, message, args, subbot) => {
  //=============VC IDS=================
  const voiceChannel1 = '637822723585736760'
  const voiceChannel2 = '640850187845238785'
  const voiceChannel3 = '641678635073536029'
  const voiceChannel4 = '641695877794103335'
  const voiceChannel5 = '638375764126990348'
    const searchString = args.slice(0).join(' ');
    const url = args[0] ? args[0].replace(/<(.+)>/g, '$1') : '';
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('CONNECT')) {
        return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
    }
    if (!permissions.has('SPEAK')) {
        return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
    }
    //-------------------------------
    // const playlist = bot.playlist;
    // if (!args[0]) return message.channel.send('Please supply a song.', { code: 'asciidoc' });
    // ytdl.getInfo(song, (error, info) => {
    //   if (error) {
    //     console.warn(`Error: ${error}`);
    //     return message.channel.send('The requested video does not exist or cannot be played.', { code: 'asciidoc' });
    //   }
    //   playlist.queue.push({ link: args[0], title: info['title'] });
    //   message.channel.send(`"${info['title']}" has been added to the queue.`, { code: 'asciidoc' });
    //   let playable = !playlist.stopped && playlist.queue.length && !playlist.playing;
    //   if (playable) {
    //     player(bot, message);
    //   }
    // });
    //-------------------------------
    if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
        const ytplaylist = await youtube.getPlaylist(url);
        const videos = await ytplaylist.getVideos();
        for (const video of Object.values(videos)) {
            const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
            await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }
        return message.channel.send(`✅ Playlist: **${ytplaylist.title}** has been added to the queue!`);
    } else {
        try {
            var video = await youtube.getVideo(url);
        } catch (error) {
            try {
                var videos = await youtube.searchVideos(searchString, 10);
                let index = 0;
                message.channel.send(`
  __**Song selection:**__
  ${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
  Please provide a value to select one of the search results ranging from 1-10.
                      `);
                // eslint-disable-next-line max-depth
                try {
                    var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                        maxMatches: 1,
                        time: 10000,
                        errors: ['time']
                    });
                } catch (err) {
                    console.error(err);
                    return message.channel.send('No or invalid value entered, cancelling video selection.');
                }
                const videoIndex = parseInt(response.first().content);
                var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
            } catch (err) {
                if(err.reason === "quotaExceeded") return message.channel.send("Youtube API quota exceeded! Please wait until midnight Pacific Time.")
                console.error(err);
                return message.channel.send('🆘 I could not obtain any search results.');
            }
        }
        return handleVideo(video, message, voiceChannel);
    }
    async function handleVideo(video, message, voiceChannel, ytplaylist = false) {
        console.log(video);
        const song = {
            id: video.id,
            title: Util.escapeMarkdown(video.title),
            url: `https://www.youtube.com/watch?v=${video.id}`
        };
        const playlist = bot.playlist;
        ytdl.getInfo(song.url, (error, info) => {
            if (error) {
                console.warn(`Error: ${error}`);
                return message.channel.send('The requested video does not exist or cannot be played.');
            }
            playlist.queue.push({ link: song.url, title: info['title'] });
            message.channel.send(`"${info['title']}" has been added to the queue.`);
            let playable = !playlist.stopped && playlist.queue.length && !playlist.playing;
            if (playable) {
                player(bot, message);
              }
            }
        );
    }

}
//==================================Command Ends Here===========================
module.exports.help = {
    name: 'play',
    description: 'Adds the song to the playlist.',
    usage: 'play [search query|youtube link]'
}