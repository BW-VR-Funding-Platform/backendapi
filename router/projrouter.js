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
  const id = req.params.id;
  model
    .findById(id, "projects")
    .then((project) =>
      res
        .status(200)
        .json({
          message: "This is information of project with specific ID",
          project,
        })
    )
    .catch((err) => res.status(500).json({ status: 500, err }));
});



// UPDATE post
router.put('/:id', (req,res) =>{
  const {id} = req.params;
  const changes = req.body;

  model.findById(id,'projects')
  .then(project =>{

      if(project){
          model.update(changes, id)
          .then(updated =>{
              res.status(201).json({success:'Project information is updated',...changes, id: project.id, UpdatingInformation: updated})
          })
      }else{
          res.status(401).json({message: `Could Not Find Oroject With ID: ${id}`, error: err})
      }
     
  }).catch(err => {
    console.log(err)
      res.status(500).json({ message: 'Failed To Update Project', errormessage: err });
    });
})


router.delete("/:id", (req, res) => {
  const id = req.params.id;
  model
    .remove(id)
    .then((res) =>
      res
        .status(200)
        .json({ message: "This project was successfully deleted", res })
    )
    .catch((err) => res.status(500).json({ error: 500, err }));
}); // worked!

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
