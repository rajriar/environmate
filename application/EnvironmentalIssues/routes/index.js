var express = require('express');
var router = express.Router();

var search = require('../javascript/search.js');

router.use('/about', require('./about.js'));
router.use('/about/forms', require('./forms.js'));
router.use('/users', require('./users.js'));
router.use('/profile',require('./profile.js'));
//router.use('/signup',require('./signup.js'));

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CSC 648 Team 1 Home Page' });
});

router.get('/results', function(req, res, next) {
    search.find(req, function(err, data) {
        if (err) {
            res.send('Error querying Database');
        } else {
            res.render('results', {
                data: JSON.parse(JSON.stringify(data)),
                title: "Results page"
            });
        }
    });
    //search.close(req);
});

router.get('/header', function(req, res, next) {
    res.render('header');
});

router.get('/footer', function(req, res, next) {
    res.render('footer');
});

module.exports = router;