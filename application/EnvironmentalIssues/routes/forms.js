const express = require('express');
var router = express.Router();
const app = express();
var bodyParser = require('body-parser');


app.use(express.urlencoded({extended: true}));


//642 project
router.get('/jonathanjulian', function (req, res, next){
    res.render('about/forms/jonathanjulian',{title: '642 personal form',});
});

router.get('/confirmation', function (req, res, next){
    res.render('about/forms/confirmation');
});

router.post('/confirmation', function (req, res, next){
    
    res.render('about/forms/confirmation', {data: req.body});
        
});

module.exports = router;