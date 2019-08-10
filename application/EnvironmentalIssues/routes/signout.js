/*
* Author: Johnathan Lee
* updated: 8.9.2019
* Function -- router for signout requests.
*/

const express = require("express");
const router = express.Router();

router.use(express.json());

router.post('/', (req, res, next) => {
    console.log("/signout")
    res.clearCookie("user");
    return res.redirect('/');
});

module.exports = router;