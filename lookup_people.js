const pg = require("pg");
const settings = require("./settings"); // settings.json


const outputFamousPeople = function(famous_people){
  console.log(`Found ${famous_people.length} famous people:`);
  famous_people.forEach((famous_person)=>{
    outputFamousPerson(famous_person);
  })
};

const  outputFamousPerson = function(famous_person){
  console.log(`- ${famous_person.first_name} , ${famous_person.last_name} - born: ${famous_person.birthdate.toString().substr(0,15)}` );
};


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("connected!")
  console.log("searching...");

  client.query("SELECT * FROM famous_people where last_name like $1;", [`%${process.argv[2]}%`], (err, result) => {
    if (err) {
      client.end();
      return console.error("error running query", err);
    }
    outputFamousPeople(result.rows);
    client.end();
  });
});



