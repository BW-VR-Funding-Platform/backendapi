exports.up = function (knex) {
  return knex.schema.createTable("projects", (tbl) => {
    tbl.increments("id"); // id

    tbl.integer("project_id")
      .unsigned()
      .notNullable()
    ;

    tbl.string("project_name", 100).notNullable();

    tbl.string("project_founder", 100).notNullable();

    tbl.text("project_description", 250).notNullable();

    tbl.decimal("project_goal", 65, 2) // numbers are allow after decimal, max size 65
    
      .notNullable();
  });
}; // close for `.up`
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("projects");
};
