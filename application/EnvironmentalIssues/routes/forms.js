const express = require('express');
var router = express.Router();
const app = express();

var Recaptcha = require('express-recaptcha').RecaptchaV3;
//import Recaptcha from 'express-recaptcha'
var recaptcha = new Recaptcha('SITE_KEY', 'SECRET_KEY');
//or with options
var options = {'hl':'de'};
var recaptcha = new Recaptcha('SITE_KEY', 'SECRET_KEY', options);

app.use(express.urlencoded({extended: true}));
const {check, validationResult} = require('express-validator/check');

//642 project
router.get('/jonathanjulian', function (req, res, next){
    res.render('about/forms/jonathanjulian',{title: '642 personal form', captcha:res.recaptcha});
});

router.get('/confirmation', function (req, res, next){
    res.send(req.check('firstName').isAlpha());
});

router.post('/confirmation', function (req, res, next){
    res.render('about/forms/confirmation', {data: req.body});
});

module.exports = router;