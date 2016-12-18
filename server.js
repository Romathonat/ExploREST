const querystring = require('querystring');
var session = require('express-session');

const conf = require('./conf.js');

var port = process.env.PORT || 3000;

var isProduction = process.env.NODE_ENV === 'production';
console.log('env is prod =', isProduction);

if (isProduction) { // prod :
  var express = require('express');
  var http = require('http');

  // Init express server
  var app = this.app = new express();

  app.use(express.static(__dirname + '/'));

  //for react router, we redirect on index.html
  app.get('*', function (request, response){
    response.sendFile(__dirname+'/index.html');
  })


  var listeningApp = http.createServer(app);
  listeningApp.listen(port, function (err, result) {
    if(err) {
      return console.log(err);
    }
  });
  console.log(`Listening at http://localhost:${port}`);
} else { // dev :

  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var config = require('./webpack.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  }).listen(port, function (err, result) {
    if (err) {
      return console.log(err);
    }
    console.log('Listening at http://localhost:' + port + '/');
  });
}
