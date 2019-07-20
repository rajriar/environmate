var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', (req, res) => {

  models.users.findOne({
    where: {
      USER_ID: req.body.userid
    }
  }).then(async (user) => {
    if (!user && !await user.comparePassword(req.body.password)) {
      res.status(401).json({ token: null, errorMessage: 'failed!' })
    } else {
      console.log(user.dataValues);
      console.log("logged in");
      res.send(user.dataValues);
    }
  });
});

router.get("/register", (req, res) => {
  res.send("register page")
})

router.post("/register", (req, res, next) => {
  models.User.findOne({
    where: {
      email: req.body.USER_EMAIL
    }
  }).then(user => {

    //if email is already being used
    if (user) {
      return res.status(400).json({ result: "Email is already used." });
    }

    models.User.create({
      USER_ID: req.body.userid,
      USER_EMAIL: req.body.email,
      PASSWORD: req.body.password,
      FIRST_NAME: req.body.firstname,
      LAST_NAME: req.body.lastname,
      DATE_OF_BIRTH: req.body.dateofbirth,
      SIGNUP_DATE: new Date(),
      INACTIVE: false,
      ID_ROLE: "1"
    });

    return res.status(200).json({ result: "New user has been created!" });
  });

});

convertSequilizeToObject = sequelizeResp => {
  var replacer = app.get("json replacer");
  var spaces = app.get("json spaces");
  var body = JSON.stringify(sequelizeResp, replacer, spaces);
  return JSON.parse(body);
};

module.exports = router;
