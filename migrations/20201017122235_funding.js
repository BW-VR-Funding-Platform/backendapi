exports.up = function (knex, Promise) {
  return knex.schema.createTable("funding", (tbl) => {
    tbl.increments("id"); // id

    tbl.integer("funding_id").unsigned().notNullable();

    tbl
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("project_id")
      .inTable("projects");

    tbl
      .string("project_name")
      .unique()
      .notNullable()
      .references("project_name")
      .inTable("projects");
      

    tbl
      .text("project_description", 250)
      .notNullable()
      .unsigned()
      .notNullable()
      .references("project_description")
      .inTable("projects");

    tbl
      .decimal("project_raised", 65, 2) // numbers are allow after decimal, max size 65
      .unique()
      .notNullable()
      .references("project_id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
}; // close for `.up`
exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("funding");
};
