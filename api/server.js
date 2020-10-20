require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require ("morgan");
// const session = require('express-session')


//router
const authRouter = require("../auth/auth-router");
const userRouter = require("../user/user-router");
const projRouter = require("../router/projrouter");
const fundRouter = require("../router/fundingrouter");
const restrictedMw = require("../auth/restricted-mw");

//server
const server = express();
// server.use(session(sessionConfig));

//middleware
server.use(express.json());
server.use("/",helmet());
server.use("/", morgan("---testing for creating API sprint---"));
server.use(cors());


//routers
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/projects",restrictedMw, projRouter);
server.use("/api/funding", fundRouter);



server.get("/", (req, res) => {
  res.status(200).json({ api: "Hi!Welcome to Virtual Reality Funding Platform" })  
});

module.exports = server;
