const express = require("express");

const {renderLogin, validateCredentials} = require("../controllers/loginController.js")

const router = express.Router();

router.route("/")
    .get(renderLogin)
    .post(validateCredentials)

module.exports = router;