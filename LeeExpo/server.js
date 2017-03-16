const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/build'));

app.get('http://52.37.31.115/', function (req, res) {
  res.sendfile('./build/index.html', {root: __dirname + '/build'})
})

app.listen(PORT , function () {
  console.log('Example app listening on port '+PORT)
})