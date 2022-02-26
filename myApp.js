//Required Imports
require('dotenv').config();
var mongoose = require("mongoose");
const circularJSON = require('flatted');
//Define Model
const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model('Person', personSchema);
console.log("Created Person Model ", Person);
//Mongo DB Connection
console.log("Connect to MONGO URI " + process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err)
    console.error(err);
  else {
    console.log("Connected to Mongo DB ", circularJSON.stringify(db));
    console.log("Mongoose Connection : Connected State " + mongoose.connection.readyState);
  }
});
//Create Person Document
function getPerson(name, age, foods) {
  return new Person({ "name": name, "age": age, "favoriteFoods": foods });
}
//Create & Save Person
const createAndSavePerson = (done) => {
  let person = getPerson("G B Aswath", 30, ["Dosai", "Poori"]);
  person.save(function (err, data) {
    if (err) {
      console.log("Error While Saving Document " + err);
      done(err);
    } else {
      console.log("Result after Addition " + JSON.stringify(data));
      done(null, data);
    }
  });
};
//Create Array of Documents
const createManyPeople = (arrayOfPeople, done) => {
  console.log("Got People " + JSON.stringify(arrayOfPeople));
  Person.create(arrayOfPeople, function (err, data) {
    if (err) {
      console.log("Error While Saving Documents " + err);
      done(err);
    } else {
      console.log("Result after Bulk Addition " + JSON.stringify(data));
      done(null, data);
    }
  });
};
//Find Person By Name
const findPeopleByName = (personName, done) => {
  console.log("Got Person Name " + personName + " to Search");
  Person.find({ name: personName }, function (err, data) {
    if (err) {
      console.log("Error While Retrieving Document " + err);
      done(err);
    } else {
      console.log("Result after Find " + JSON.stringify(data));
      done(null, data);
    }
  });
};
//Find Person by Favorite Foods
const findOneByFood = (food, done) => {
  console.log("Got Food " + food + " to Search");
  Person.findOne({ favoriteFoods: food }, function (err, data) {
    if (err) {
      console.log("Error while searching using findOne()" + err);
      done(err);
    } else {
      console.log("Result after FindOne " + JSON.stringify(data));
      done(null, data);
    }
  })
};
//Find Person By ID
const findPersonById = (personId, done) => {
  console.log("Going to Search using ID " + personId);
  Person.findById({ _id: personId }, function (err, data) {
    if (err) {
      console.log("Error while searching using ID " + err);
      done(err);
    } else {
      console.log("Got Searched Data " + data);
      done(null, data);
    }
  })
};
//Find & Save Person Document
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  console.log("Got Person ID " + personId + " to Search");
  Person.findById({ _id: personId }, function (err, data) {
    if (err) {
      console.log("Error while searching with ID " + err);
      done(err);
    } else {
      console.log("Got Person " + data);
      data.favoriteFoods.push(foodToAdd);
      data.save(function (err, updatedData) {
        if (err) {
          console.log("Error While Saving Document " + err);
          done(err);
        } else {
          console.log("Result after Update " + JSON.stringify(updatedData));
          done(null, updatedData);
        }
      });
    }
  });
};
//Find & Update Person Document
const findAndUpdate = (personName, done) => {
  console.log("Find Person using " + personName);
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, function (err, data) {
    if (err) {
      console.log("Error while Find & update " + err);
      done(err);
    } else {
      console.log("Updated Age " + data);
      done(null, data);
    }
  });
};
//Remove Document By ID
const removeById = (personId, done) => {
  console.log("Got Person Search By ID " + personId);
  Person.findByIdAndRemove({ _id: personId }, function (err, data) {
    if (err) {
      console.log("Got Error while Find & Remove " + err);
      done(err);
    } else {
      console.log("Removed Document " + data);
      done(null, data);
    }
  });
};
//Remove Many Person Documents Matching Name
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) {
      console.log("Error while Removing " + err);
      done(err);
    } else {
      console.log("Removed Data " + JSON.stringify(data));
      done(err, data);
    }
  });
};
//Chaing Query & Execute
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch }).sort('name').limit(2).select('name favoriteFoods').exec(function (err, data) {
    if (err) {
      console.log("Error in Query Chain Execution " + err);
      done(err);
    } else {
      console.log("Result after Query Chain Execution " + JSON.stringify(data));
      done(null, data);
    }
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;