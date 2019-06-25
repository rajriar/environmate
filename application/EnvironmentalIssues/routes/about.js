var express = require('express');
var router = express.Router();

/* Main about page */
router.get('/', function (req, res, next) {
    res.render('about/about', { title: 'Team 1', });
});

router.get('/michael', function (req, res, next) {
    res.render('about/michael', { title: 'Team 1', });
});

router.get('/angie', function (req, res, next) {
    res.render('about/angie', { title: 'Team 1', });
});

router.get('/carlos', function (req, res, next) {
    res.render('about/carlos', { title: 'Team 1', });
});

router.get('/jonathan', function (req, res, next) {
    res.render('about/jonathan', { title: 'Team 1', });
});

router.get('/johnathan', function (req, res, next) {
    res.render('about/johnathan', { title: 'Team 1', });
});

router.get('/raj', function (req, res, next) {
    res.render('about/raj', { title: 'Team 1', });
});

router.get('/sandhya', function (req, res, next) {
    res.render('about/sandhya', { title: 'Team 1', });
});

module.exports = router;