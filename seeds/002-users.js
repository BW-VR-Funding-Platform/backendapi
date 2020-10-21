exports.seed = function (knex) {
  const users = [
    {
      firstname: "",
      lastname: "",
      password:"", 
      role: 1,
    },
    {
      firstname: "edd",
      lastname: "bummings",
      password:"password", 
      role: 1,
    },

  ];

  // Inserts seed entries
  return knex("users").insert(users);
};
