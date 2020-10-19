require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require ("morgan");

const authRouter = require("../auth/auth-router");
const userRouter = require("../user/user-router");
const projRouter = require("../router/projrouter");
const restrictedMw = require("../auth/restricted-mw");

const server = express();

server.use("/",helmet());
server.use(express.json());
server.use("/", morgan("---testing for creating API sprint---"));
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/projects",restrictedMw, projRouter);


server.get("/", (req, res) => {
  res.json({ api: "Welcome to Virtual Reality Funding Platform" })  
});

module.exports = server;
