const multer  = require('multer');

const fs = require("fs");
const path = require("path");

const accounts = require("../data/accounts.json")

// MULTER Object 
exports.upload = multer({
    storage:multer.diskStorage({
        destination:function(req, file, cb)
        {
            cb(null, path.join(__dirname, "..", "public", "upload"));
        },
        filename:function(req, file, cb)
        {
            const src = Date.now()+ '-' +path.extname(file.originalname);

            const todo =
            {
                taskName: req.body.taskName,
                img :
                {
                    src: "/upload/"+src,
                    alt: file.fieldname
                }
            }

            // Pushing the task
            const idx = req.session.index;
            accounts[idx].todoList.push(todo);
            
            cb(null, src);
        }
    })
}).single("file");


exports.writeFile = (req, res) => {
    if(req.body.taskName.trim()==='')
    {
        return res.status(400).json({
            status: "fail",
            message: "Task Name empty"
        });
    }

    // Writing data into the file
    fs.writeFile(path.join(__dirname, "..", "data","accounts.json"), JSON.stringify(accounts), (err) =>
    {
        if(err)
        {
            console.log("err");
            res.end(err);
        }
        res.status(201).json({
            status: "success",
            data: {
                taskName: req.body.taskName,
                url: req.file.filename
            }
        });
    })
};