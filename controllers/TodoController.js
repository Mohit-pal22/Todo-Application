const fs = require("fs");
const path = require("path");
const accounts = require("../data/accounts.json");

exports.renderTodos = (req, res) =>
{
    if(req.session.isLogedIn)
    {
        return res.status(200)
            .render("todoList.ejs", {
                title: "Todo List",
                tasks: accounts[req.session.index].todoList
            })
    }
    else
        res.redirect("/login");
}

exports.deleteTodo = (req, res) =>
    {
        if(req.session.isLogedIn)
        {
            const i = req.body.index;
            const task = accounts[req.session.index].todoList.splice(i,1);
            fs.unlink(path.join(__dirname, "..", "public", "upload", task[0].img.src), (err) => {
                if (err) {
                    res.json(
                    {
                        status: "Fail",
                        data: null
                    });
                } else {
                    res.json({
                        status: "success"
                    })
                }
            });
            fs.writeFile(path.join(__dirname, "..", "data", "accounts.json"), JSON.stringify(accounts), (err)=>
            {
                if(err)
                    res.json(
                    {
                        status: "Fail",
                        data: null
                    })
            })
        }
        else
        {
            res.status(400).json(
                {
                    status: "fail",
                    message: "need to login"
                }
            );
        }
}

exports.completeTodo = (req, res) => {
    if(req.session.isLogedIn){
        const idx = req.body.index;
        let taskState = accounts[req.session.index].todoList[idx].completed;
        accounts[req.session.index].todoList[idx].completed = !taskState;
        res.status(200).json(
            {
                status: taskState,
                data: null       
            }
        )
        fs.writeFile(path.join(__dirname, "..", "data", "accounts.json"), JSON.stringify(accounts), (err)=>
        {
            if(err)
                res.json(
            {
                status: "Fail",
                data: null
            })
        }) 
    }else
    {
        res.status(400).json(
            {
                status: "fail",
                message: "need to login"
            }
        );
    }
}