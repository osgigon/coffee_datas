module.exports = app => {
    const login = require("../controllers/login.controller");

    app.post("/register", login.create);

    app.get("/login/:userName/:password", login.findOne);

}