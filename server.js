var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/api', function(req, res) {
  console.log('POST!');
  res.send('POST!')
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
