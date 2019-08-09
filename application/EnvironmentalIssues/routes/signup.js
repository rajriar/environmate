/*
* Author: Johnathan Le
* updated: 8.8.2019
* Function -- router for register requests.
*/
const express = require("express");
const router = express.Router();

router.use(express.json());

const models = require('../models');
const test = require('./index');

router.post("/", (req, res, next) => {
    console.log('req.body');
    console.log(req.body);

    models.users.findOne({
      where: {
        userEmail: req.body.userEmail
      }
    }).then(async user => {
        
        // if email is already being used
        if (user) {
            return res.json({result: "Email in use.", title: "CSC 648 Team 1 Home Page" });
            //return res.render('./index.ejs', { result: "Email in use.", title: "CSC 648 Team 1 Home Page" });
        }

        models.users.create({
            userId: req.body.userid,
            userEmail: req.body.userEmail,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            inactive: false
        }).then(user => {
            console.log("User ID: ", user.userId);
            user.setRole('1');
            return res.redirect('/');

            //return res.render('./index.ejs', {result: "successfully registered", title: "CSC 648 Team 1 Home Page"});

        }).catch((error) => {
            console.log("Error creating a user. Details: ", error)
        })

    })

});


// Request to view a all incidents
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
      
        res.render('index', { data: incident,title: 'CSC 648 Team 1 Home Page' });
      
    });
  });

  
module.exports = router;