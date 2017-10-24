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
   console.log("inserting...");
   knex('famous_people').insert({last_name:   process.argv[2],
                                  first_name: process.argv[3],
                                  birthdate:  process.argv[4]
                                  } ).then(()=>{console.log("inserted");return knex.destroy();}).finally(()=>{console.log("bye");return});





