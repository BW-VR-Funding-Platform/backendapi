const router = require("express").Router();

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

const Users = require("../user/user-model");

const config = require("../api/config");
const { isValid } = require("../user/user-service");
const { token } = require("morgan");

router.post("/register", (req, res) => {
  // implement registration
  const users = req.body;

  if (isValid(users)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcryptjs.hashSync(users.password, rounds); //hash the password
    users.password = hash;
    //save user to dBase
    Users.add(users)
      .then((user) => {
        res
          .status(201)
          .json({
            message: "Welcome! Your account sucessfully registered",
            data: user,
          });
      })
      .catch((err) => {
        res.status(500).json({ message: err });
      });
  } else {
    res.status(400).json({
      errmessage:
        "Please provide your firstname and lastname an password to regist ",
    });
  }
});

router.post("/login", (req, res) => {
  const { firstname, lastname, password } = req.body;
  // implement login

  Users.findBy({ firstname, lastname })
    .then(([user]) => {
      // compare password & hash stored in db
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = getJwt(user);
        res.status(200).json({
          message: "Welcome, it's Virtual Reality Funding Platform ",
          user,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid user" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

function getJwt(user) {
  const payload = {
    role: user.user_id,
    firstname: user.firstname,
    lastname: user.lastname,
  };
  const jwtTime = {
    expiresIn: "30h",
  };
  return jwt.sign(payload, config.jwtSecret, jwtTime);
}

module.exports = router;
