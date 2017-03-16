const express = require('express');
const app = express();

const PORT = process.env.PORT || 80;

app.use(express.static(__dirname + '/build'));

app.get('/', function (req, res) {
  console.log('get endpoint')
  res.sendfile('./build/index.html', {root: __dirname + '/build'})
})

app.listen(PORT , function () {
  console.log('Example app listening on port '+PORT)
})