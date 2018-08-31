const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  firstname: {type: String, required: true, unique: true},
  lastname: {type: String, required: true},
  phone: {type: String, required: false},
  address: {type: String, required: false},
  city: {type: String, required: false},
  state: {type: String, required: false},
  zipcode: {type: Number, required: false},
});

const Person = mongoose.model('Person', personSchema);

module.exports = { Person }