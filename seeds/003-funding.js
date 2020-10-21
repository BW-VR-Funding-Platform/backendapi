exports.seed = function (knex) {
  const funding = [
    {
      id: 1,
      project_id: 1,
      project_name: "Astro App - Translate Sign Language ",
      project_description: "What do you write in a Astro project description",
      project_raised: 26700
    },
    {
      id: 2,
      project_id: 2,
      project_name: "Stark App - Healthcare",
      project_description: "What do you write in  Stark project description",
      project_raised: 564500
    },
    {
      id: 3,
      project_id: 3,
      project_name: "Skyhawks App - Virtual Assistant ",
      project_description: "What do you write in  Skyhawks project description",
      project_raised: 6234.00
    },
    {
      id: 4,
      project_id: 4,
      project_name: "Project X App - Travel Vision ",
      project_description:
        "What do you write in Project X  project description",
      project_raised: 731400
    },
    {
      id: 5,
      project_id: 5,
      project_name: "Cascade App- Virtual Shopping",
      project_description: "What do you write in Cascade project description ",
      project_raised: 828500
    },
  ];

  return knex("funding").insert(funding);
};
