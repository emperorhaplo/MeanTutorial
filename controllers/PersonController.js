var Person = require('../models/person')

exports.addPerson = async function(req, res, next) {
    if (!req.query.name || !req.query.age ) {
        return res.status(400).json({ message: "Both name and age parameters are required." })
    }
    var person = {
        name: String(req.query.name).toLowerCase(),
        age: parseInt(req.query.age)
    };
    var newPerson = new Person(person);
    try {
        var persons = await Person.paginate({ name: req.query.name }, {})
        if (persons.total > 0) {
            return res.status(400).json({ message: "Person with same name already exists." })
        }
        var createPerson = await newPerson.save()
        return res.status(200).json({ message: "Person created successfully."})
        
    } catch(error) {
        return res.status(400).json({ message: error.messsage });
    };
}

exports.getPerson = async function(req, res, next) {
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : 1;
    var query = req.query.name ? { name: String(req.query.name).toLowerCase() } : {};
    try {
        var names = await Person.paginate(query, { page: page, limit: limit });
        return res.status(200).json({names: names, message: 'Persons retrieved successfully.'});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    };
}

exports.deletePerson = async function(req, res, next) {
    // digest the request
    // turn it into a query
    // make sure the query corresponds to one result
    // return the result
}

exports.updatePerson = async function(req, res, next) {
    // digest the request
    // turn it into a query
    // make sure the query corresponds to one result
    // update that result with contents of the query
    // return the result
}
