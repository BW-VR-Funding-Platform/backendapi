exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments("user_id"); // id

    tbl
      .string("firstname", 100)
      .unique()
      .notNullable()
      .references("id")
      .inTable("funding");

    tbl
      .string("lastname", 100)
      .notNullable()
      .references("id")
      .inTable("funding");
    tbl
      .string("password", 100)
      .notNullable();

    tbl.boolean("role").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
