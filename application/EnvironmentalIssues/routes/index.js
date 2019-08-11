/*
* Author: Sandhya sankaran
* Author: Jonathan Julian
* updated: 8.8.2019
* Function -- router for index/home pages.
*/


var express = require('express');
var router = express.Router();

var search = require('../javascript/search.js');

router.use('/about', require('./about.js'));
router.use('/about/forms', require('./forms.js'));
router.use('/users', require('./users.js'));
router.use('/profile',require('./profile.js'));
const models = require('../models');
//router.use('/signup',require('./signup.js'));

/* GET home page. */
router.get('/results', function(req, res, next) {
    search.find(req, function(err, data) {
        if (err) {
            res.send('Error querying Database');
        } else {
            res.render('results', {
                data: data,
                title: "Results page"
            });
        }
    });
    //search.close(req);
});

// Request to view recent incidents in homepage

router.get('/', async function (req, res) {
    models.incidents.findAll({
        limit:5,
        include: [ //includes associations defined in models
          {
              association: 'Location',
              include:[ //2nd level association in location model
                  { 
                      association: 'Zipcode',
                      required: true
                  }
  
              ],
              required: true //required true == inner join 
          },
          {
              association: 'Status',
              required: true
          },
          {
              association: 'Type',
              required: true
          },
          {
              model: models.image,
              required: false //return false == left outter join
          }
      ],
      order: [
        ['createdAt', 'DESC']
    ],
    }).then(incident =>{
        //Render the index page with the incident details
        res.render('index', { data: incident,title: 'CSC 648 Team 1 Home Page' });
      
    });
  });


  
router.get('/header', function (req, res, next){
    res.render('header');
});

router.get('/footer', function(req, res, next) {
    res.render('footer');
});

module.exports = router
