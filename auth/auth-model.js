const db = require("../data/knexconfig")
module.exports = {
    add,
    findBy,
    findById,
  };
  
  async function add(users) {
    try {
      const [user_id] = await db("users").insert(users, "user_id");
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