const express = require("express");
const router = express.Router();

router.use(express.json());

const models = require('../Models');

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
      if (!user.comparePassword(req.body.password)) {
        res.status(401).json({ token: null, errorMessage: 'failed!' })
      } else {
        console.log(user.dataValues);
        console.log("logged in");

        res.redirect('index');
      }
    });
});

module.exports = router;