const fundrouter = require("express").Router();

const fundmodel = require("./fundingmodel");

//GET all the funding informations

fundrouter.get("/", (res, req) => {
  fundmodel
    .find("funding")
    .then((res) => {
      req.status(200).json({ message: "This is funding information", res });
    })
    .catch((err) => {
      res.status(500).json({ errormessage: err });
    });
});

//GET funding by id
fundrouter.get("/:id", (req, res) => {
  const id = req.params.id;
  fundmodel
    .findById(id, "funding")
    .then((funding) =>
      res.status(200).json({
        message: "This is information of project with specific ID",
        funding,
      })
    )
    .catch((err) => res.status(500).json({ status: 500, err }));
});

// UPDATE project information
fundrouter.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    fundmodel
      .findById(id, "funding")
      .then((funding) => {
        if (funding) {
          fundmodel.update(changes, id).then((updated) => {
            res
              .status(201)
              .json({
                success: "Project information is updated",
                ...changes,               
                UpdatingInformation: updated,
              });
          });
        } else {
          res
            .status(401)
            .json({
              message: `Could Not Find Object With ID: ${id}`,
              error: err,
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res
          .status(500)
          .json({ message: "Failed To Update Object", errormessage: err });
      });
  });


module.exports = fundrouter;