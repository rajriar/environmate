var express = require('express');
var router = express.Router();

//about page
router.get("/", function(req, res, next) {
    res.render("about", { title: 'CSC 648 Team 1 Home Page' });
});

module.exports = router;