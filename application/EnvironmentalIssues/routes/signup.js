/*
* Author: Johnathan Lee
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

            // return res.render('./index.ejs', { result: "Email in use.", title: "CSC 648 Team 1 Home Page" });
            
            // 422 means unable to process the contained instructions - closely implies invalid args
           return res.status(422).send({ reason: "Email is already in use by other user."});
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

            // return res.render('./index.ejs', {result: "successfully registered", title: "CSC 648 Team 1 Home Page"});
            // I'm not sure if we need to redirect to home page on success login - Michael'comment

            // set cookie for user
            res.cookie("user", user.dataValues);

            // success status
            res.status(204).send();


        }).catch((error) => {
            res.status(400).send({message: "Something wrong happened, please try again.."});
            console.log("Error creating a user. Details: ", error)
        })

    })

});


  
module.exports = router;