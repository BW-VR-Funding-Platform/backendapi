const db = require("../data/knexconfig");
module.exports = {
  find,
  findById,
  findBy,
  update,
  remove,
};

function find(data) {
  return db(data);
}

function findById(id, data) {
  return db(data)
    .select(
      "id",
      "project_id",
      "project_name",
      "project_founder",
      "project_description",
      "project_goal"
    )
    .where({ id })
    .first();
}



function findBy(filter) {
  return db("projects").where(filter).orderBy("id");
}

function update(changes,id) {
  return db("projects")
  
    .where({ id })
    .update(changes); //updates the record with 'changes' where the id matches
}

function remove(id) {
  return db("projects").where("id", id).del();
}
