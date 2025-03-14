const express = require("express");
const multer = require("multer");
const path = require("path");

const accounts = require("./data/accounts.json");

const router = express.Router();
const upload = multer({
    storage:multer.diskStorage({
        destination:function(req, file, cb)
        {
            cb(null, "./images");
        },
        filename:function(req, file, cb)
        {
            const src = Date.now().toLocaleString()+ file.originalname;
            accounts[req.session.index].todoList[1].img.src = src;
            accounts[req.session.index].todoList[1].img.alt = req.body.taskName;
            cb(null, src);
        }
    })
}).single("fileName");

router.get("/home", (req, res) =>
{
    res.sendFile(path.join(__dirname,"public", "index.html"));
})
router.post("/", upload, (req, res, next) =>
{           
    console.log("Multer ", accounts[req.session.index])
    console.log(accounts);
    // console.log(req.session, req.params.id);
    res.status(201).send(req.body);
});

// router.listen(3000, () => console.log("multer started at 3000"));
module.exports = router;