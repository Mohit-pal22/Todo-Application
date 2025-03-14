const accounts = require("../data/accounts.json")

exports.renderLogin = (req, res) =>
{
    if(req.session.isLogedIn)
        res.redirect("/home");
    else
        res.render("login.ejs",{
            title: "Login Page",
            header: "Login"    
        })
}

exports.validateCredentials = (req, res) =>
{
    const user = accounts.find((acc) => acc.email===req.body.email);
    if(user && user.password===req.body.password)
    {   
        req.session.isLogedIn=true;
        req.session.index = accounts.indexOf(user);
        return res.status(200)
            .redirect("/home");
    }
    else
    {
        if(user)
            res.status(404).send("Password Incorrect");
        else
            res.status(404).send("Incorrect Email");
    }
}