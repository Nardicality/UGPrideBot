const Discord = require('discord.js');
const getArtistTitle = require('get-artist-title');
const axios = require('axios');
const cheerio = require('cheerio');
const settings = process.env

const baseURL = `https://api.genius.com/search?access_token=${settings.GENIUS}`;
let playlist;

async function scrapeLyrics(path) {
  return axios.get(path)
    .then(response => {
      let $ = cheerio.load(response.data);
      return [$('.header_with_cover_art-primary_info-title').text().trim(), $('.lyrics').text().trim()];
    })
    .catch(err => {
      console.warn(err);
    });
};

async function searchLyrics(url) {
  return Promise.resolve(axios.get(url, { 'Authorization': `Bearer ${settings.GENIUS}` })
    .then(response => checkSpotify(response.data.response.hits))
    .then(path => scrapeLyrics(path))
    .catch(err => {
      console.warn(err);
    })
  );
};

async function checkSpotify(hits) {
  return await hits[0].result.primary_artist.name === 'Spotify' ? hits[1].result.url : hits[0].result.url;
};

async function createQuery(arg) {
  if (arg[0] === 'np') {
    query = [artist, title] = getArtistTitle(playlist.current, {
      defaultArtist: ' '
    });
    console.log(query)
    return query.join(' ')
  } else return arg.join(' ');
};

exports.run = async function (bot, message, args) {
  playlist = bot.playlist;

  if (!args[0]) return message.channel.send(`Usage: ${exports.help.usage}`);

  const query = await createQuery(args);
  console.log(`the query is ${query}`)
  var queryURL = `${baseURL}&q=${encodeURIComponent(query)}`
  console.log(queryURL)
  var songLyrics = await searchLyrics(queryURL)
  console.log(songLyrics[1].length)
  if (songLyrics[1].length >= 2048) {
  const songLyrics1 = chunkSubstr2(songLyrics[1], 2048)
    const embed1 = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTitle(`Lyrics for: ${songLyrics[0]}`)
      .setDescription(songLyrics1[0]);
    
    const embed2 = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setDescription(songLyrics1[1])
      .setFooter('Lyrics provided by GENIUS');
    await message.channel.send({embed: embed1});
    await message.channel.send({embed: embed2});
  } else {
    const embed = new Discord.RichEmbed()
      .setColor(0x00AE86)
      .setTitle(`Lyrics for: ${songLyrics[0]}`)
      .setDescription(songLyrics[1])
      .setFooter('Lyrics provided by GENIUS');
    message.channel.send({ embed });
  }
};
  function chunkSubstr2(str, size) {
    var numChunks = Math.ceil(str.length / size),
        chunks = new Array(numChunks);
  
    for(var i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size);
    }
  
    return chunks;
  }
exports.help = {
  name: 'lyrics',
  description: 'Fetches lyrics for a song.',
  usage: 'lyrics [np | search query]'
};