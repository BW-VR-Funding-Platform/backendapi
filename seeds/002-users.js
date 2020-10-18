exports.seed = function (knex) {
  const users = [
    {
      user_id: 1,
      firstname: "user",
      lastname: "user",
      password:"", 
      role:"",
    },
  ];

  // Inserts seed entries
  return knex("users").insert(users);
};
