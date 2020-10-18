const router = require("express").Router();

const Users = require("./user-model")
const restricted = require("../auth/restricted-mw")
const jwt = require("jsonwebtoken");
const config = require('../api/config');
const { isValid } = require("../auth/auth-service");


router.post("/register", (req, res) => {
    // implement registration
    const users = req.body;
  
    if (isValid(users)) {
      const rounds = process.env.BCRYPT_ROUNDS || 8;
  
      const hash = bcryptjs.hashSync(users.password, rounds); //hash the password
      users.password = hash;
      //save user to dBase
      Users.add(users)
        .then(user => {
          res.status(201).json({ firstname: user.firstname, lastname: user.lastname 
          });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    } else {
      res.status(400).json({
        message:
          "Please provide your firstname and lastname an password to regist ",
      });
    }
  });


  router.post("/login", (req, res) => {
    const { firstname, lastname, password } = req.body;
    // implement login
      Users.findBy(firstname, lastname)
        .then(user => {
          // compare password & hash stored in db
          if (user && bcryptjs.compareSync(password, user.password)) {
            const token = getJwt(user);
            res.status(200).json({ message: "Welcome, it's Virtual Reality Funding Platform ",user, token });
          } else {
            res.status(401).json({ message: "Invalid user" });
          }
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
  });

  function getJwt(user) {
    const payload = {
      role: user.id,
      username: user.username,
    };
    const jwtTime = {
      expiresIn: "12h",
    };
    return jwt.sign(payload, config.jwtSecret, jwtTime);
  }
  
  module.exports = router;