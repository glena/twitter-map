Twinalizer
==========

Jugando con Node.js, D3.js y Twitter Streaming API
http://twenalizer.herokuapp.com/

Novedades
---------

* Muestra tweets en real time de Venezuela
* Visualización en el mapa + tooltip del tweet en los puntos del mapa + listado de tweets cargados
* Responsive
* Tweaks + improvements al mapa
* Storage en mongodb para no guardarlos en memoria
* Al conectar un nuevo websocket manda todos los tweets almacenados para no esperar a cargar los nuevos

------------------------------------------------------------------------------

Playing with Node.js, D3.js & Twitter Streaming API

News
----

* Showing real time tweets about Venezuela
* Showing the location in the map + map points tooltip + tweets list
* Responsive
* Tweaks + map's improvements 
* Stores the loaded tweets on MongoDB
* When it receives a new websocket connections, sends all the stored tweets.

------------------------------------------------------------------------------

config.js
=========

exports.config = {
    consumer_key:         ''
  , consumer_secret:      ''
  , access_token:         ''
  , access_token_secret:  ''
}



[![Analytics](https://ga-beacon.appspot.com/UA-51467836-1/glena/twinalizer)](http://germanlena.com.ar)
