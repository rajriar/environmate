var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CSC 648 Team 1 Home Page' });
});

//about page
router.get("/about", function(req, res, next) {
    res.render("about.ejs");
});

module.exports = router;