const router = require("express").Router();
const express = require("express");
const model = require("./projmodel");

//GET all projects
router.get("/", (res, req) => {
  model
    .find("projects")
    .then((res) => {
      req.status(200).json(res);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

//GET projects by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  model
    .findById(id, "projects")
    .then((project) =>
      res.status(200).json({
        message: "This is information of project with specific ID",
        project,
      })
    )
    .catch((err) => res.status(500).json({ status: 500, err }));
});

//UPDATE new project
router.post('/', (req, res) =>{
  let newPro = req.body;
  model.insert(newPro).then(newPro=>{
      res.status(200).json({message :" New Project is updated",newPro})
  })
  .catch(err=>{
    console.log(err)
      res.status(500).json({message: 'Failed To Add New Project', postSent: newPro, errormessage:err})
  })
})

// UPDATE project information
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  model
    .findById(id, "projects")
    .then((project) => {
      if (project) {
        model.update(changes, id).then((updated) => {
          res
            .status(201)
            .json({
              success: "Project information is updated",
              ...changes,
              id: project.id,
              UpdatingInformation: updated,
            });
        });
      } else {
        res
          .status(401)
          .json({
            message: `Could Not Find Oroject With ID: ${id}`,
            error: err,
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ message: "Failed To Update Project", errormessage: err });
    });
});


router.delete("/:id", (req, res) => {
  model.remove(req.params.id)
    .then((num) => {
      if (num === 1) {
        res.status(204).json({ message: "This project was successfully deleted" }).end();
      } else {
        res.status(404).json({ message: "Something is strange" }).end();
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "There was an error", error: err.message });
    });
});
//204 should return nothing
// .del() will return a 1 on success -> make sure you invoke it :stuck_out_tongue:
// 200 will return data
// check your status codes!


function checkRole(role) {
  return function (req, res, next) {
    if (req.jwt.role === role) {
      next();
    } else {
      res.status(403).json({ message: "you have no access" });
    }
  };
}

module.exports = router;
