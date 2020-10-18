const db = require('../data/knexconfig')
module.exports = {
    find,
    add,
    findById,
    findBy,
    update,
    remove
  };

  function find(data){
    return db(data)
  }
  function add(){

  }
  function findById(){

  }
  function findBy(){

  }
  function update(){

  }
  function remove(){

  }