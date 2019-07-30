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
            return res.status(400).json({ result: "Email in use." });
        }

        models.users.create({
            userId: req.body.userid,
            userEmail: req.body.userEmail,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            //dateOfBirth: req.body.dateOfBirth,
            dateOfBirth: new Date(),
            inactive: false
        }).then(user => {
            console.log("User ID: ", user.userId);
            users.setRole('1');
            return res.status(200).json({ result: "Account created." });
            //res.send(req.body)
            return user;
        }).catch((error) => {
            console.log("Error creating a user. Details: ", error)
        })

    })

});
  
module.exports = router;