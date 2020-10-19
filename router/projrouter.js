const router = require("express").Router();

const model = require("./projmodel");

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

router.get("/:id", (req, res) => {
  const { id } = req.params;

  model
    .findById(id)
    .then((project) => {
      if (project) {
        res.json(project);
      } else {
        res
          .status(404)
          .json({ message: "Could not find project with given id." });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({
          message: "500 error status ! Failed to get project information",
        });
    });
});
//done

router.post("/", (req, res) => {
  const data = req.body;
  model
    .add(data)
    .then((res) => {
      res.status(201).json(res);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to create new project" }, err);
      console.log(err);
    });
});

router.put("/:id", (req, res) => {
    const id = req.params.id
  model.update(req.body, id, 'projects')
  .then(res=>{
      res.status(200).json({message: 'Project is updated successfully', res})
      .catch(err=>{
          res.status(500).json({ error: err})
      })
  });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id
    model.remove(id)
    .then(res => res.status(200).json({message:'This project was successfully deleted', res}))
    .catch(err => res.status(500).json({error: 500, err}))
  });

// function checkRole(role) {
//   return function (req, res, next) {
//     if (req.jwt.role === role) {
//       next();
//     } else {
//       res.status(403).json({ message: "you have no access" });
//     }
//   };
}

module.exports = router;
