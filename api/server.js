const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require ("morgan");
const authrouter = require("../auth/auth-router")



const server = express();

server.use("/",helmet());
server.use(express.json());
server.use("/", morgan("---testing for creating API sprint---"));
server.use(cors());

server.use("/api/auth", authrouter)

server.get("/", (req, res, next) => {
  res.json({ api: "Welcome to Virtual Reality Funding Platform", query: req.query  })  
});

module.exports = server;
