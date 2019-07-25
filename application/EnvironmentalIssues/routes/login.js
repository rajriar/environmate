const express = require("express");
const router = express.Router();
const cookieParser = require('cookie-parser');
var app = express();

router.use(express.json());
app.use(cookieParser);

const models = require('../Models');

router.use(function (req, res, next) {
  let cookieName = req.cookies.cookieName;
  if(!cookieName) {
    let newCookie = Math.random().toString();
    res.cookie('cookieName', newCookie);
  }
  console.log("cooke: " + cookieName);
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
        console.log(user.dataValues);
        console.log("logged in");
      }
      return res.status(200).json("result: logged in as " + user.userEmail);
      }
    );
});

module.exports = router;