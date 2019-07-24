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
    }).then(async (user) => {
      if (!user && !await user.comparePassword(req.body.password)) {
        res.status(401).json({ token: null, errorMessage: 'failed!' })
      } else {
        console.log(user.dataValues);
        console.log("logged in");
        //res.send(user.dataValues);
      }
    });
});

module.exports = router;