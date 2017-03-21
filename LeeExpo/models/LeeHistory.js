const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//Defining the schema for reviews
const SingleOrderSchema = new Schema({
    order:Object  
})

const ServiceSchema = new Schema({
    created_at: Date,
    updated_at: Date,
    AllNightOrders: [SingleOrderSchema] //Adding an array of employees to our coffee shop schema
});

const ThisService = mongoose.model('LeeHistory', ServiceSchema);
module.exports = ThisService;
