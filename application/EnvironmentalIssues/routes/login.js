const express = require("express");
const router = express.Router();

router.use(express.json());

const models = require('../Models');

const generateSessionToken = () => token(15);

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

        let userSessionToken = generateSessionToken()
        user.setDataValue('sessionToken', userSessionToken);

        user.save().then(() => res.status(200)
          .json({ token: userSessionToken, admin: user.isAdmin }));
      }
    });
});

/**
 *
 * @param length
 * @returns {string}
 */

const rand = () =>
  Math.random(0)
    .toString(36)
    .substr(2);

const token = length => (rand() + rand() + rand() + rand()).substr(0, length);

router.put("/session/:token/end", (req, res) => {
  models.User.findOne({
    where: {
      sessionToken: req.params.token
    }
  }).then(user => {
    if (!user) {
      return res.status(400).json({ error: "Bad Request" });
    }
    user.setDataValue("sessionToken", null);
    user.save().then(() => res.status(204).send());
  });
});

module.exports = router;