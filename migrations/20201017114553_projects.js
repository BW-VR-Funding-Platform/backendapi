exports.up = function (knex) {
  return knex.schema.createTable("projects", (tbl) => {
    tbl.increments("id"); // id

    tbl
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl.string("project_name", 100).unique().notNullable();

    tbl.string("project_founder", 100).unique().notNullable();

    tbl.text("project_description", 250).notNullable();

    tbl.decimal("project_goal", 65, 2) // numbers are allow after decimal, max size 65
      .unique()
      .notNullable();
  });
}; // close for `.up`
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("projects");
};
