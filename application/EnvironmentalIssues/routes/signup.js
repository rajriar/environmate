const express = require("express");
const router = express.Router();

router.use(express.json());

const models = require('../Models');

// router.post('/login', (req, res) => {
//     console.log('req.body');
//     console.log(req.body);
//     models.users.findOne({
//       where: {
//         userid: req.body.userid
//       }
//     }).then(async (user) => {
//       if (!user && !await user.comparePassword(req.body.password)) {
//         res.status(401).json({ token: null, errorMessage: 'failed!' })
//       } else {
//         console.log(user.dataValues);
//         console.log("logged in");
//         res.send(user.dataValues);
//       }
//     });
// });

router.post("/", (req, res, next) => {
    console.log('req.body');
    console.log(req.body);

    models.users.findOne({
      where: {
        userEmail: req.body.userEmail
      }
    }).then(user => {
  
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
            signupDate: new Date(),
            inactive: false,
            idRole: "1"
        }).then(user => {
            console.log("User ID: ", user.userId);
            //res.send(req.body)
            return user;
        })
    return res.status(200).json({ result: "Account created." });
    })

});

// convertSequilizeToObject = sequelizeResp => {
//     var replacer = app.get("json replacer");
//     var spaces = app.get("json spaces");
//     var body = JSON.stringify(sequelizeResp, replacer, spaces);
//     return JSON.parse(body);
// };
  
module.exports = router;