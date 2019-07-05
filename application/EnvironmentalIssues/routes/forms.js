const express = require('express');
var router = express.Router();
const app = express();

app.use(express.urlencoded({extended: true}));
const {check, validationResult} = require('express-validator/check');

//642 project
router.get('/jonathanjulian', function (req, res, next){
    res.render('about/forms/jonathanjulian',{title: '642 personal form',});
});

router.get('/confirmation', function (req, res, next){
    res.send(req.check('firstName').isAlpha());
});

router.post('/confirmation', function (req, res, next){
    res.render('about/forms/confirmation', {data: req.body});
});

module.exports = router;