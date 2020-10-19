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

// function add(project) {
//   return db('projects')
//     .insert(project)
//     .then(ids =>( {
//       id: ids[0]
//     }))
//   // .catch(err =>{
//   //   return null
//   // })
// }

function add(newObj) {
  return db('projects')
    .insert(newObj)
    .then((id) => {
      return findById(id[0], projects);
    });
}

function findById(id) {
  return db("projects")
    .where({ id })
    .then((projects) => {
      if (!projects.length) {
        return null;
      } else {
        return projects;
      }
    });
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
