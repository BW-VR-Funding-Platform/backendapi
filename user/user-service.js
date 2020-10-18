
module.exports = {
    isValid,
  };
  
  function isValid(users) {
    return Boolean(users.firstname && users.lastname && users.password && typeof users.password === "string");
  }