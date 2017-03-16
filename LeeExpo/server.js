const express = require('express');
const app = express();

const PORT = process.env.PORT || 80;

app.use(express.static(__dirname + '/build'));

app.get('*', function (req, res) {
  console.log('get endpoint *')
  res.sendfile('./build/index.html', {root: __dirname + '/build'})
})

app.get('/', function (req, res) {
  console.log('get endpoint /')
  res.sendfile('./build/index.html', {root: __dirname + '/build'})
})

app.get('ec2-52-37-31-115.us-west-2.compute.amazonaws.com', function (req, res) {
  console.log('get endpoint ec2-52-37-31-115.us-west-2.compute.amazonaws.com')
  res.sendfile('./build/index.html', {root: __dirname + '/build'})
})

app.get('http://52.37.31.115/', function (req, res) {
  console.log('get endpoint http://52.37.31.115/')
  res.sendfile('./build/index.html', {root: __dirname + '/build'})
})

app.listen(PORT , function () {
  console.log('Example app listening on port '+PORT)
})