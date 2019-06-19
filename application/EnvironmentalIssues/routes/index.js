var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CSC 648 Team 1 Home Page' });
});

<<<<<<< HEAD
=======
//about page
router.get('/about', function(req, res, next) {
    res.render('about/about', { title: 'Team 1',});
});

>>>>>>> fe5a2422cce14063e85e131bd397cee1d24461e9
module.exports = router;