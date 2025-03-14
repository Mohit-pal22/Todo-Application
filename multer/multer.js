const express = require("express");
const multer  = require('multer');
const path = require("path");

const app = express();
const upload = multer({
    storage:multer.diskStorage({
        destination:function(req, file, cb)
        {
            cb(null, path.join(__dirname, "upload"));
        },
        filename:function(req, file, cb)
        {
            const src = file.originalname;
            // accounts[req.session.index].todoList[1].img.src = src;
            // accounts[req.session.index].todoList[1].img.alt = req.body.taskName;
            cb(null, src);
        }
    })
}).single("file");


app.post('/upload', upload, function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body, req.file.originalname)
    res.end("success");
})
app.use((req, res) =>
{
    res.sendFile(path.join(__dirname, "index.html"));
})

app.listen(3000, () => console.log("Server Started"));