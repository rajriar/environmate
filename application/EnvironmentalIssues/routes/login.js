const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');
var app = express();

router.use(express.json());
app.use(cookieParser);

const models = require('../models');

router.use(function (req, res, next) {
  // let cookieName = req.cookies.cookieName;
  // if(!cookieName) {
  //   let newCookie = Math.random().toString();
  //   res.cookie('cookieName', newCookie);
  // }
  // console.log("cooke: " + cookieName);
  next();
})

router.post('/', (req, res, next) => {
    console.log('req.body');
    console.log(req.body);
    models.users.findOne({
      where: {
        userEmail: req.body.userEmail
      }
    }).then(user => {
        console.log("compare password: " + user.comparePassword(req.body.password));
        console.log(!user);
        if (!user.comparePassword(req.body.password) || user == null) {
            res.status(401).json({ token: null, errorMessage: 'failed!' })
        } else {
            // res.cookie("user", {
            //     firstName: user.firstName,
            //     lastName: user.lastName,
            //     email: user.userEmail,
            //     id: user.userId,
            //     role: user.idRole
            // });
            req.session.firstName = user.firstName;
            req.session.lastName = user.lastName;
            req.session.email = user.userEmail;
            req.session.id = user.userId;
            req.session.role = user.idRole;

            console.log("session: " + req.session.firstName);

            console.log("logged in as: ", user.dataValues);
        }

        res.status(204).send();
    });
});

module.exports = router;