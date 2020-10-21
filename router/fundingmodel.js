const db = require("../data/knexconfig");
module.exports = {
    find,
    findById,
    update,
  };

  //find project data
function find(funding) {
    return db("funding");
  }

  // find funding by id
function findById(id, data) {
    return db("funding")
      .select(
        "id",
        "project_id",
        "project_name",
        "project_description",
        "project_raised"
      )
      .where({ id })
      .first();
  }
  
  //update new infor of pj to db
  function update(changes,id) {
    return db("funding")
      .where({ id })
      .update(changes); //updates the record with 'changes' where the id matches
  }
  
