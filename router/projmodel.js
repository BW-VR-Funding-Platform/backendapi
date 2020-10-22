const db = require("../data/knexconfig");
module.exports = {
  find,
  findById,
  insert,
  findBy,
  update,
  remove,
};

//find project data
function find(data) {
  return db(data);
}

//find project by id
function findById(id, data) {
  return db(data)
    .select(
      "id",
      "project_name",
      "project_founder",
      "project_description",
      "project_goal"
    )
    .where({ id })
    .first();
}

//Insert new project to db
function insert(newPro) {
  return  db('projects').insert(newPro).returning(['id','project_name','project_founder','project_description','project_goal']);
}


function findBy(filter) {
  return db("projects").where(filter).orderBy("id");
}

//update new infor of pj to db
function update(changes,id) {
  return db("projects")
    .where({ id })
    .update(changes); //updates the record with 'changes' where the id matches
}

//remove project from db
function remove(id) {
  return db("projects").where({id}).del();
}
