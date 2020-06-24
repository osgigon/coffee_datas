/*
1.- Setting
2.- MiddleWare
3. Routes
*/
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//Middlewares
//app.use(express.json());
//app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Routes
app.get("/", (req, res) => {
    console.log("Principal: " + req.body.toString());
    res.json({message: "Welcome my first application"});
});

require("../src/routes/login.routes")(app);

//setting
app.set("port", process.env.PORT || 3000);

//Starting the serve
app.listen(app.get("port"), ()=> {
    console.log("Server on port", app.get("port"));
});
