const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendfile('./public/index.html')
})

app.listen(8080 , function () {
  console.log('Example app listening on port 8080!')
})