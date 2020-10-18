const router = require('express').Router();

const model = require('./projmodel');


router.get('/', (req,res) =>{
    model.find()
})

router.get('/:id', (req, res)=>{
    model.findById()
})

router.post('/', (req,res) =>{
    model.add()
})

router.put('/:id', checkRole(), (req,res) =>{
    model.update()
})

router.delete('/:id', (req,res) =>{

})


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