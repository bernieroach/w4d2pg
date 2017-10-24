var knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : 'your_database_user',
    password : 'your_database_password',
    database : 'myapp_test'
  }
});
const pg = require('pg');
const settings = require("./settings");
const client = new pg.Client({
  user : settings.user,
  password : settings.password,
  database : settings.database,
  host : settings.host,
  port : settings.port,
  ssl : settings.ssl,
});




client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT $1::int AS number", ["1"], (err, result) => {
    if (err) {
      client.end();
      return console.error("error running query", err);
    }
    console.log(result);
    console.log(result.rows[0].number); //output: 1
    client.end();
  });
});


