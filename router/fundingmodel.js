const db = require("../data/knexconfig");
module.exports = {
    find,
    update,
  };

  //find project data
function find(funding) {
    return db("funding");
  }

  
  //update new infor of pj to db
  function update(changes,id) {
    return db("funding")
      .where({ id })
      .update(changes); //updates the record with 'changes' where the id matches
  }
  
