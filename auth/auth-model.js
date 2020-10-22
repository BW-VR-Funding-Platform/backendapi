const db = require("../data/knexconfig");
module.exports = {
  add,
  find,
  findBy,
  findById,
};
function find() {
  return db("users")
    .select("user_id", "firstname", "lastname")
    .orderBy("user_id");
}
function add(users) {
  return db("users")
    .insert(user)
    .then((id) => {
      return db("users").where({ id: id[0] }).first();
    })
    .catch((err) => {
      return err;
    });
}

function findById(user_id) {
  return db("users").where({ user_id }).first();
}

function findBy(filter) {
  return db("users").where(filter).first();
}
