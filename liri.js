require("dotenv").config();

//Import Packages
const fs = require('fs')
const moment = require('moment')
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

//Define arguments and methods
const API = require('./api')
const Command = process.argv.slice(2, 3).toString()
const Args = process.argv.slice(3).join('+');

//Switch function based on user command and arguments
const userQ = (c, a) => {
  switch (c) {
    case 'concert-this':
      API.getConcert(a)
        .then(res => {
          const events = res.data.map(event => {
            const venue = event.venue.name
            const location = `${event.venue.city}, ${event.venue.region}`
            const date = moment(event.datetime).format('L')

            return {
              Venue: venue,
              Location: location,
              Date: date
            }
          })

          console.log(events)
        })
        .catch(err => console.log(err))
      break;
    case 'spotify-this-song':
      API.getSong(a)
        .then(res => {
          const data = res.tracks.items[0];
          const artist = data.artists[0].name
          const preview = data.external_urls.spotify
          const songName = data.name
          const album = data.album.name
          const track = {
            Artist: artist,
            Album: album,
            Preview: preview,
            Song_Name: songName,
          }
          console.log(track)
        });
      break;
    case 'movie-this':
      API.getMovie(a)
        .then(res => {
          const { data } = res;

          const movie = {
            Title: data.Title,
            Year: data.Year,
            IMDB_Rating: data.imdbRating,
            Rotten_Tomatoes_Rating: data.Ratings.find(e => e.Source === "Rotten Tomatoes").Value,
            Country: data.Country,
            Languages: data.Language,
            Plot: data.Plot,
            Actors: data.Actors
          }

          console.log(movie)
        })
        .catch(err => console.log(err))
      break;
    case 'do-what-it-says':
      fs.readFile('./random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        const newQuery = data.split(',')
        userQ(newQuery[0], newQuery[1].split(' ').join('+'))
      });
      break;
    default:
      console.log('default');
  }
}

userQ(Command, Args)
