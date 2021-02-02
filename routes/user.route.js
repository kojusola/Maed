const router = require('express').Router();
const userController = require('../controllers/user.auth.controllers');

router.get('/register', (req,res) =>{
    res.render('register');
})
router.get('/login', (req,res) =>{
    res.render('login');
})


router.post('/register', userController.signup);
router.post('/login', userController.login);
module.exports = router;