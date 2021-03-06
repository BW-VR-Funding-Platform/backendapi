
const router = require("express").Router();

const Users = require("../user/user-model");
const restricted = require("../auth/restricted-mw");

router.get("/", restricted, checkRole("user"), (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json({ users, jwt: req.jwt });
        })
        .catch(err => res.send(err));
});

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