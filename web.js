/*

http://stackoverflow.com/questions/16427039/displaying-streaming-twitter-on-webpage-with-socket-io-node-js
https://github.com/ttezel/twit
https://dev.twitter.com/docs/api/1.1/get/statuses/firehose

http://bost.ocks.org/mike/map/

*/

var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,Twit = require('twit')
  , io = require('socket.io').listen(server);

server.listen(80);

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// geojson
app.get('/world.json', function (req, res) {
  res.sendfile(__dirname + '/world.json');
});

var T = new Twit({
    consumer_key:         'BkmKEViIObRP2VcyEBmMmg'
  , consumer_secret:      '0x13S4lV8096wpTgDniiA4oha3PCWeS8hKiXQk28'
  , access_token:         '366141931-HseJ1hqbqEahQzMMS5kSnpwIv8nt0C14gPyHY0Cr'
  , access_token_secret:  'OZ0JCoD3rmVoMIsxso6yNvdQPXyAxCsjvw7xEkFjOryPI'
});

io.sockets.on('connection', function (socket) {    
  console.log('Connected');

  var stream = T.stream('statuses/sample', {});

  stream.on('tweet', function (tweet) {

    if (tweet.geo)
    {
      io.sockets.emit('stream',tweet);
    }

  });

});


