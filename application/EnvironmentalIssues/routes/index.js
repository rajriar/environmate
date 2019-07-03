var express = require('express');
var router = express.Router();

router.use('/about', require('./about.js'));
router.use('/about/forms', require('./forms.js'));
router.use('/users', require('./users.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CSC 648 Team 1 Home Page' });
});


module.exports = router;