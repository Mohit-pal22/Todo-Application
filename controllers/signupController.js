const fs = require("fs");
const path = require("path");
const accounts = require("../data/accounts.json");

exports.renderSignup = (req, res) =>
{
    if(req.session.isLogedIn)
        return res.status(200)
            .redirect("/home");
    else
    {
        res.status(200)
            .render("signup.ejs", {
                title: "signup",
                header: "Sign Up"
            });
    }
}

exports.validateCredential = (req, res, next) =>
{
    const newAccountEmail = req.body.email.toLowerCase();
    if(newAccountEmail.includes(' ') || !(newAccountEmail.includes("@gmail.com") || newAccountEmail.includes("@email.com"))) 
    {
        return res.status(403)
            .json
            ({
                status: "fail",
                data:
                {
                    message: "Email Invalid"
                }
            });
    }

    // Check if passwords are correct
    if(req.body.password===req.body.confirmPassword)
    {
        // Checking if account with email Already exist  
        const account = accounts.find((acc) => acc.email===newAccountEmail);
        if(account)
        {
            return res.status(409)
            .json({
                status: "fail",
                data: {
                    message: "Account Already Exist",
                }
            });
        }
        next();
    }
    else
    {
        res.json(
            {
                status: "fail",
                message: "Password Not Match"
            }
        )
    }
}
    
exports.CreateAccount = (req, res) => 
{
    const newAccount = 
    {
        id: accounts[accounts.length-1].id+1,
        email: req.body.email.toLowerCase(),
        password: req.body.password,
        todoList: 
        [
            {
                taskName: "Add Tasks",
                img: 
                {
                    src: "/upload/anime_girl.jpg",
                    alt: "Default image"
                }
            }
        ]
    }
    accounts.push(newAccount);
    req.session.isLogedIn = true;
    req.session.index = accounts.length-1;
    
    // Writing data into the file
    fs.writeFile(path.join(__dirname,"..","data","accounts.json"), JSON.stringify(accounts), (err) =>
    {
        if(err)
        {
            console.log("err");
            res.end(err);
        }
        else
            res.status(201).redirect("/home");
    })
}