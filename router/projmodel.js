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
  // .catch(err =>{
  //   return null
  // })
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
  return db('users').where(filter).orderBy('id')
}
function update(change, id, data) {
  return db(data)
  .update(change)
  .where({ id })
  .then(() =>{
    return findById(id, data)
  })
}

function remove(id) {
  return db("projects")
    .where("id", id)
    .del();
}
