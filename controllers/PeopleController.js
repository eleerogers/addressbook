const { Person } = require('../models/Person');

//controllers
// functions for accessing the DB
// setup query function - useful!
// use promises here

//CRUD (Create, Read, Update, Delete)

const PeopleController = {

  // Get all people in Address Book
  getAllPeople(req, res, next){
    Person.find({})
    .exec(function(err, people){
      if(err){
        res.send('error has occured');
      } else {
        console.log(people);
        //next(people);
        res.json(people);
      }
    });
  },

  // Add new person to Address Book
  createPerson(req, res, next){
    const newPerson = new Person();

    newPerson.firstname = req.body.firstname;
    newPerson.lastname = req.body.lastname;
    newPerson.phone = req.body.lastname;
    newPerson.address = req.body.address;
    newPerson.city = req.body.city;
    newPerson.state = req.body.city;
    newPerson.zipcode = req.body.zipcode;

    newPerson.save(function(err, person){
      if(err){
        console.log(err);
        res.send('error saving person');
      } else {
        console.log(person);
        res.json(person);
      }
    });
  },

  // Get person by first name
  getPersonInfo(req, res, next){
    Person.findOne({
      firstname: req.params.firstname
    })
    .exec(function(err, person){
      if(err){
        res.send('error occured');
      } else {
        console.log(person);
        res.json(person);
      }
    });
  },

  // Find person by first name and delete
  deletePerson(req, res, next){
    Person.findOneAndRemove({
      firstname: req.params.firstname
    })
    .exec(function(err, person){
      if(err){
        res.send('error occured');
      } else {
        console.log(person);
        res.json(person);
      }
    });
  },

  // Edit person in Address Book
  editPerson(req, res, next){
    Person.findOneAndUpdate({
      firstname: req.params.firstname
    },
    { $set: { firstname: req.body.firstname }},
    { upsert: true },
    function(err, person){
      if(err){
        console.log("error occured");
        console.log(err);
      } else {
        console.log(person);
        res.send(person);
      }
    });
  }

}

module.exports = PeopleController;