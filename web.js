var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  ,Twit = require('twit')
  , io = require('socket.io').listen(server);

var port = process.env.PORT || 5000;
server.listen(port);

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// geojson
app.get('/world.json', function (req, res) {
  res.sendfile(__dirname + '/world.json');
});

var T = new Twit({
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
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


