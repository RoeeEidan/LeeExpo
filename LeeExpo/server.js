const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ThisService = require('./models/LeeHistory');
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/data/db/');


//    URL STUff


const PORT = process.env.PORT || 3032;

app.use(express.static(__dirname + '/build'));



app.listen(PORT , function () {
  console.log('Example app listening on port '+PORT)
})


//    MONGODB STUFF


mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
	console.log("Connected to db at /data/db/")
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/NewService', function (req, res) {//create new Service
	console.log('got a post req')
	let newThisService = ThisService(
		{
			AllNightOrders: []
		}
	);

	newThisService.save((err, newThisService) => {
		if (err) {
			res.send(err);
		} else {
			console.log(newThisService._id)
			res.send(newThisService._id);
		}
	})
});


app.post('/NewOrder/:id', function (req, res) {//adding a order to a dealership (dealership hard coded)
	console.log('we got a post')
  console.log(req.params.id)
  console.log(req.body.NewOrder)
	let newSingleOrder = {
		order: req.body.NewOrder
	}
	ThisService.findById(req.params.id)
		.then(ThisService => {
			console.log(ThisService);
			ThisService.AllNightOrders.push(newSingleOrder);
			console.log('just pushed')
			res.send(ThisService);
			return ThisService.save();
		})
		.catch(err => {
			console.log(err);
		})
});


app.get('/GetAllOrdersOfService', function (req, res) { //get all orders by service id
	ThisService.findById('58d01af568d6f4492255aff7')
		.then(ThisService => {
			const AllOrders = ThisService.AllNightOrders
			console.log(AllOrders);
			res.send(AllOrders);
		})
		.catch(err => {
			console.log(err);
		})
})




app.get('/', function (req, res) {
  console.log('get endpoint /')
  res.sendfile('./build/index.html', {root: __dirname + '/build'})
})