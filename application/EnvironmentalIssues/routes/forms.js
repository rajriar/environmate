const express = require('express');
var router = express.Router();
const app = express();
var bodyParser = require('body-parser');
var request = require('request');


app.use(express.urlencoded({ extended: true }));


//642 project
router.get('/jonathanjulian', function (req, res, next) {
    res.render('about/forms/jonathanjulian', { title: 'CSC 642 Summer 2019 Individual Assignment Jonathan Julian' });
});

router.post('/confirmation', function (req, res, next) {
    if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null)
  {
    return res.json({"responseError" : "Please select captcha first"});
  }

  const secretKey = "6LfeXawUAAAAAGpbknNj09d9QYRAF4ASv44vBEaS";

  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

  request(verificationURL,function(error,response,body) {
    body = JSON.parse(body);

    if(body.success !== undefined && !body.success) {
      return res.json({"responseError" : "Failed captcha verification"});
    }
    res.render('about/forms/confirmation', { data: req.body, title: 'Results verification page Jonathan Julian' });
  });
});






// -------------------Carlos642------------------
router.get('/carlosForm', (req, res) => {
    res.render('about/forms/carlosForm');
});

router.get('/carlosConfirm', (req, res) => {
    res.render('about/forms/carlosConfirm');
});

router.post('/carlosConfirm', (req, res) => {
    res.render('about/forms/carlosConfirm', { data: req.body });
});
// -------------------Carlos642------------------






// -------------------Angie Cruz Martinez------------------

router.get('/acmartinez', function(req, res) {  res.render('about/forms/acmartinez');});
router.get('/acmconfirm', function(req, res) {  res.render('about/forms/acmconfirm');});
router.post('/acmconfirm', function(req, res){  res.render('about/forms/acmconfirm', {data: req.body});});

// -------------------Angie Cruz Martinez------------------





module.exports = router;

