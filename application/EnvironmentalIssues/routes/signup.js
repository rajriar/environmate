/*
* Author: Johnathan Lee
* updated: 8.8.2019
* Function -- router for register requests.
*/
const express = require("express");
const router = express.Router();

router.use(express.json());

const models = require('../models');

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
            return res.render('./index.ejs', { result: "Email in use.", title: "CSC 648 Team 1 Home Page" });
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
            return res.render('./index.ejs', {result: "successfully registered", title: "CSC 648 Team 1 Home Page"});

        }).catch((error) => {
            console.log("Error creating a user. Details: ", error)
        })

    })

});
  
module.exports = router;