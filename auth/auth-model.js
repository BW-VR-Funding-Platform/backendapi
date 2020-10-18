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
async function add(users) {
  try {
    const [user_id] = await db("users").insert(firstname, lastname, "user_id");
    return findById(user_id);
  } catch (error) {
    throw error;
  }
}

function findById(user_id) {
  return db("users").where({ user_id }).first();
}

function findBy(filter) {
  return db("users").where(filter).first();
}
