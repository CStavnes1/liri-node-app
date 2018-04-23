require("dotenv").config();
const request = require("request");
var fs = require('fs');


const keys = require("./keys.js")
const Spotify = require('node-spotify-api');
const Twitter = require('twitter');
//console.log(keys)


const spotify = new Spotify(keys.spotify);
const twitter = new Twitter(keys.twitter);

// console.log(spotify)
//console.log(twitter)



const userArg = process.argv[2];
let value = process.argv[3];
//let movieName = process.argv[3]

switch (userArg) {
    case "my-tweets":
        tweets();
        break;

    case "spotify-this-song":
        spotifyThisSong();
        break;

    case "movie-this":
      omdbThisMovie();
      break;

    case "do-what-it-says":
      readFromFile();
      break;
};

//getting  20 most recent tweets from my fake twitter with created on date
function tweets() { twitter.get('statuses/user_timeline', function(error, tweets, response) {
    //console.log(tweets)
        if (error) throw error;

        for (i = 0; i < 20; i++) {
          console.log(tweets[i].text);
          console.log(tweets[i].created_at);
        };
 });
 };


//getting song info from spotify API 
function spotifyThisSong() {
    if (value == null) {
      value = 'Good Riddance';
    }
    spotify
      .search({ type: 'track', query: value })
      .then(function (response) {
        console.log(response.tracks.items[0].artists[0].name);
        console.log(response.tracks.items[0].name);
        console.log(response.tracks.items[0].preview_url);
        console.log(response.tracks.items[0].album.name);
      });
  }


//OMDB request function
function omdbThisMovie() {

  if (value == null) {
    value = 'Mr. Nobody';
  }


  request(`http://www.omdbapi.com/?t=${value}&y=&plot=short&apikey=trilogy`, function (error, response, body) {

    if (!error && response.statusCode === 200) {

      console.log("Title: " + JSON.parse(body).Title)
      console.log("Release: " + JSON.parse(body).Year)
      console.log("Title: " + JSON.parse(body).imdbRating)
      console.log("Produced in: " + JSON.parse(body).Country)
      console.log("Plot: " + JSON.parse(body).Plot)
      console.log("Actors: " + JSON.parse(body).Actors)

    }
  });


}



//reading from txt file for liri command
function readFromFile() {
  fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
          console.log(error);
      } else {
        
          var dataArr = data.split(',')
              console.log(dataArr[1])

              let value = dataArr[1]

              console.log(value)

              spotifyThisSong(dataArr[1]);

          
          
      }
  });

}