const express = require("express");

const router = express.Router();

const {renderSignup, validateCredential, CreateAccount} = require("../controllers/signupController");

router.route("/")
    .get(renderSignup)
    .post(validateCredential, CreateAccount);
    
module.exports = router;