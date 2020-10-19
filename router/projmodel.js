const db = require("../data/knexconfig");
module.exports = {
  find,
  add,
  findById,
  findBy,
  update,
  remove,
};

function find(data) {
  return db(data);
}

function add(data) {
  return db(data)
    .insert(data)
    .then((id) => {
      return findById(id);
    });
}

function findById(id, data) {
  return db(data)
    .where({ id })
    // .then(project => {
    //   if (!project.length) {
    //     return null;
    //   } else {
    //     return projects;
    //   }
    // });
    .first()
}

function findBy(filter) {
  return db("projects").where(filter).orderBy("id");
}

function update(id, projects) {
  return db("projects").where("id", Number(id)).update(projects);
}

function remove(id) {
  return db("projects").where("id", id).del();
}
