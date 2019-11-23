require("dotenv").config();

const keys = require("./keys.js");
const axios = require('axios');
const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);

exports.getConcert = artist => {
    return axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`)
}

exports.getSong = title => {
    return spotify.search({ type: "track", query: title})
}

exports.getMovie = title => {
    return axios.get(`http://www.omdbapi.com/?t=${title}&type=movie&apikey=32e8d2ad`)
}

