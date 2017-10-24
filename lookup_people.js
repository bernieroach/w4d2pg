//const pg = require("pg");
const settings = require("./settings"); // settings.json
var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


const outputFamousPeople = function(famous_people){
  console.log(`Found ${famous_people.length} famous people:`);
  famous_people.forEach((famous_person)=>{
    outputFamousPerson(famous_person);
  })
};

const  outputFamousPerson = function(famous_person){
  console.log(`- ${famous_person.first_name} , ${famous_person.last_name} - born: ${famous_person.birthdate.toString().substr(0,15)}` );
};

  // knex outputFamousPeople
   console.log("searching...");
   knex.select().from('famous_people').where("last_name", "like", `%${process.argv[2]}%`).asCallback((err,famous_people)=>{
    if (err) {
     knex.destroy();
     return console.error("error running query", err);
   }
    outputFamousPeople(famous_people);

  }).then(()=>{console.log("then");return knex.destroy();}).finally(()=>{console.log("bye");return});





