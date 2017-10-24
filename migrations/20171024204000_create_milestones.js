
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('milestones', function(table){
      table.increments('id').primary();
      table.string('description',255);
      table.date('date_acheived');

    })
  ]);
};



exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('milestones')
  ]);
};
