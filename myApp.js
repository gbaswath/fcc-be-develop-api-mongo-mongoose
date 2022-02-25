require('dotenv').config();
var mongoose = require("mongoose");
const circularJSON = require('flatted');

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model('Person', personSchema);
console.log("Created Person Model ", Person);

console.log("Connect to MONGO URI " + process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
  if (err)
    console.error(err);
  else {
    console.log("Connected to Mongo DB ", circularJSON.stringify(db));
    console.log("Mongoose Connection : Connected State " + mongoose.connection.readyState);
  }
});

function getPerson(name, age, foods) {
  return new Person({ "name": name, "age": age, "favoriteFoods": foods });
}

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

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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