const funds = require("express").Router();
// const express = require("express");
const fundmodel = require("./fundingmodel");

//GET all the funding informations

funds.get("/", (res, req) => {
  fundmodel
    .find("funding")
    .then((res) => {
      req.status(200).json({ message: "This is funding information", res });
    })
    .catch((err) => {
      res.status(500).json({ errormessage: err });
    });
});
