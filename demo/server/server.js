var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/api', function(req, res) {
  console.log('Someone POST me!');
  console.log(req.body);
  res.send('ha');
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
