exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments("user_id"); // id

    tbl.string("firstname", 100).notNullable();

    tbl.string("lastname", 100).notNullable();
    tbl.string("password", 100).notNullable();

    tbl.boolean("role").notNullable().defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
