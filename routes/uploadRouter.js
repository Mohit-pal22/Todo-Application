const express = require("express");

const fs = require("fs");
const path = require("path");

const uploadController = require("../controllers/uploadController")

const router = express.Router();
router.route("/")
    .post(uploadController.upload, uploadController.writeFile);

module.exports = router;
