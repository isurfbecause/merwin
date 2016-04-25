var express = require('express');
var app = express();
var five = require("johnny-five");
var Raspi = require("raspi-io");
var _ = require('underscore');
var port = process.env.PORT || 3000;

var RaspiCam = require("raspicam");

var board = new five.Board({
  io: new Raspi()
});

app.use(express.static('./client/views'));

var led;
board.on("ready", function() {
  led = new five.Led("P1-13");
});

app.get('/on', function(req, res) {
  led.blink();
  res.send('on');
});

app.get('/off', function(req, res) {
  console.log('off');
  led.stop().off();
  res.send('off');
});

app.listen(port, function() {
  console.log('listening on port ' + port);
});