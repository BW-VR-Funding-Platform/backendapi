exports.up = function (knex) {
  return knex.schema.createTable("funding", (tbl) => {
    tbl.increments("id"); // id
    tbl
      .integer("project_id")
      .notNullable()
      // .references("id")
      // .inTable("projects");

    tbl
      .string("project_name")
      .notNullable()
      // .references("project_name")
      // .inTable("projects");

    tbl
      .text("project_description", 250)
      .notNullable()
      // .references("project_description")
      // .inTable("projects");

    tbl
      .decimal("project_raised", 65, 2) // numbers are allow after decimal, max size 65
      .unique()
      .notNullable();
  });
}; // close for `.up`
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("funding");
};
