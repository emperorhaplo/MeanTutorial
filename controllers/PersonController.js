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
            throw Error("Person with same name already exists.")
        }
        var createPerson = await newPerson.save()
        return res.status(201).json({ message: "Person created successfully.", data: createPerson})
        
    } catch(error) {
        return res.status(400).json({ message: error.messsage });
    };
}

exports.getPerson = async function(req, res, next) {
    var page = req.query.page ? parseInt(req.query.page) : 1;
    var limit = req.query.limit ? parseInt(req.query.limit) : 50;
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
    var id = req.query.id ? req.query.id : false

    try {
        if(!id) {
            throw Error('ID is not present on the request.')
        }
        var result = await Person.deleteOne({ _id: id })
        if (result.deletedCount === 1) {
            return res.status(200).json({ message: 'Person deleted successfully.' })
        }
        throw Error('deleted count is ' + result.deletedCount)
    } catch (error) {
        return res.status(400).json({ message: 'Delete person failed with error: ' + error.message })
    }
}

exports.updatePerson = async function(req, res, next) {
    var id = req.query.id ? req.query.id : false
    var name = req.query.name ? req.query.name.toLowerCase() : null
    var age = req.query.age ? req.query.age : null
    try {
        if (!id) {
            throw Error('ID is not present on the request.')
        }
        var person = await Person.findById(id)
        if (!person) {
            throw Error('Could not find person with ID ' + id)
        }
        if(name) {
            person.name = name
        }
        if(age) {
            person.age = age
        }
        var result = await person.save()
        return res.status(200).json({ message: 'Person updated successfully with result.', data: result })
    } catch (error) {
        return res.status(400).json({ message: 'Update person failed with error: ' + error.message })
    }
}
