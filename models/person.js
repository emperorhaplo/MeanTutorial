var mongoose = require('mongoose');
var paginate = require('mongoose-paginate');

const Schema = mongoose.Schema

var PersonSchema = new Schema({
    name: String,
    age: Number
});

PersonSchema.plugin(paginate)

const Person = mongoose.model('Person', PersonSchema)

module.exports = Person;
