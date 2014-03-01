var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , Twit = require('twit')
  , data = require('./config.js')
  , connCount = 0
  , mongo = require('mongodb')
  , io = require('socket.io').listen(server, { log: false });


io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

var mongoUri = process.env.MONGOHQ_URL ||
              'mongodb://localhost/twinalizer';

var tweetsCol;

mongo.Db.connect(mongoUri, function (err, db) {
  db.collection('tweets', function(er, collection) {
    
    tweetsCol = collection;

  });
});


var port = process.env.PORT || 5000;
server.listen(port);

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});
app.get('/main.js', function (req, res) {
  res.sendfile(__dirname + '/public/main.js');
});
app.get('/definitions.js', function (req, res) {
  res.sendfile(__dirname + '/public/definitions.js');
});
app.get('/d3.tip.js', function (req, res) {
  res.sendfile(__dirname + '/public/d3.tip.js');
});
app.get('/main.css', function (req, res) {
  res.sendfile(__dirname + '/public/main.css');
});
app.get('/world.json', function (req, res) {
  res.sendfile(__dirname + '/public/world.json');
});

app.get('/lastdata.json', function (req, res) {
  tweetsCol.find().limit(1000).sort({ created_at: -1 }).toArray( function(err, loadedTweets) {

    loadedTweets.forEach(function (t) {
      t.created_at=new Date(t.created_at);  
    });
    

    loadedTweets = loadedTweets.sort(function(a,b){
      return a.created_at - b.created_at;
    });

    res.send(loadedTweets);
  });
});


var T = new Twit({
    consumer_key:         data.config.consumer_key
  , consumer_secret:      data.config.consumer_secret
  , access_token:         data.config.access_token
  , access_token_secret:  data.config.access_token_secret
});

var stream = T.stream('statuses/filter', { track: 'venezuela' });

stream.on('tweet', function (tweet) {
  if (tweet.geo)
  {
    data = {
      geo: tweet.geo.coordinates.reverse(),
      created_at: tweet.created_at,
      id_str: tweet.id_str,
      screen_name: tweet.user.screen_name,
      text: tweet.text
    }

    tweetsCol.insert(data, {safe: true}, function(er,rs) {});

    io.sockets.emit('stream',[data]);
  }
});

/*
function filter()
{
  console.log('Tweets #' + loadedTweets.length);

  if (loadedTweets.length > 1000)
  {
    var removed = loadedTweets.shift();

    console.log('removed');
    console.log(removed);
  }
}

setInterval(filter, 60*1000);
*/