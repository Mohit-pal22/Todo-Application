const express = require("express");
const session = require('express-session');
const bodyParser = require ('body-parser');

require("dotenv").config();

const path = require("path");

const PORT = process.env.PORT || 5000;

const loginRouter = require("./routes/loginRouter.js");
const signupRouter = require("./routes/signupRouter.js");
const uploadRouter = require("./routes/uploadRouter.js");
const todoRouter = require("./routes/todoRouter");

const app = express();
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// **middleware**
app.use("/login", loginRouter);
app.use("/sign-up", signupRouter);
app.get("/logout", (req, res) =>
{
    req.session.isLogedIn = false;
    res.redirect("/login");
})
app.use("/home", todoRouter);
app.use("/task", todoRouter);
// CheckSession
app.use("/upload",(req, res, next) => 
    {
        if(req.session.isLogedIn)
            next();
        else
            res.status(400).json({
                status: "Fail",
                message: "You need to login"
            });
    })
app.use("/upload", uploadRouter);

// Default
app.use((req, res) =>
    res.redirect("/login"));

app.listen(PORT, () =>
console.log("Server is listening on ", PORT ));
