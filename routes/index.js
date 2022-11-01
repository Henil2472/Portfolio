var express = require('express');
const app = require('../app');
var router = express.Router();


const indexcontroller = require('../controllers/index')



router.get('/' , indexcontroller.Home);
router.get('/About' , indexcontroller.About);
router.get('/Contact' , indexcontroller.Contact);
router.get('/Services' , indexcontroller.Services);
router.get('/projects' , indexcontroller.Projects);
router.get('/login' , indexcontroller.login_get);
router.post('/login', indexcontroller.processLoginPage);
router.get('/register' , indexcontroller.displayRegisterPage);
router.post('/register', indexcontroller.processRegisterPage);


/* GET to perform UserLogout */
router.get("/logout", indexcontroller.performLogout);

module.exports = router;
