
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require ("morgan");
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const configsecret = require('./config')

const sessionConfig = {
  name: 'backendapiWR',
  secret: configsecret.jwtSecret,
  resave: false, 
  saveUninitialized: true,
  cookie: {
      maxAge: 1000 * 60 * 10,
      secure: false,
      httpOnly: true,
  },
  store: new KnexSessionStore({
      knex: require('../data/knexconfig'),
      tablename: 'sessions',
      sidfieldname: 'sid',
      createtable: true,
      clearInterval: 1000 * 60 * 30,
  })
};


//router
const authRouter = require("../auth/auth-router");
const userRouter = require("../user/user-router");
const projRouter = require("../router/projrouter");
const fundRouter = require("../router/fundingrouter");
const restrictedMw = require("../auth/restricted-mw");


//server
const server = express();
server.use(session(sessionConfig));

//middleware
server.use(cors()); // cors should go first!!!
server.use(express.json());
server.use("/",helmet());
server.use("/", morgan("---testing for creating API sprint---"));


//routers
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/projects",restrictedMw, projRouter);
server.use("/api/funding", fundRouter);



server.get("/", (req, res) => {
  res.status(200).json({ api:"Hi!Welcome to Virtual Reality Funding Platform"})  
});

module.exports = server;
