var express = require('express');
var router = express.Router();

router.use('/about', require('./about.js'));
router.use('/about/forms', require('./forms.js'));
router.use('/users', require('./users.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CSC 648 Team 1 Home Page' });
});

router.get('/header', function (req, res, next){
    res.render('header');
});



router.get('/footer', function (req, res, next){
    res.render('footer');
});

module.exports = router;