const sql = require("./db");

//Constructor
const User = function(login){
    this.userName = login.userName;
    this.email = login.email;
    this.password = login.password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if(err){
            console.log("Errorsaso", err);
            result(err, null);
            return;
        }

        console.log("created new user: ", {id: res.insertId, ...newUser});
        result(null, {id: res.insertId, ...newUser});
    });
};
//Funcion flecha
User.CheckUserRegistered = (userName, email, result) => {

    sql.query(`SELECT * FROM user WHERE userName = '${userName}' AND email = '${email}'`, (err, res)=>{
        if(err){
            //console.log("Error Registrado: ", err);
            result({description:`${err}`}, null);
            return;
        }
        else{
            //console.log("Resultado query1: " + res);
            result({description:""}, res);
            return;
        }
        /*console.log("Resultado query1: " + res);
        console.log("Resultado query2: " + JSON.stringify(res));
        console.log("Resultado query length: " + res.length);
        if(res.length){
            console.log("found Account: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);*/
    });
    console.log("Variable" + variable);
};

User.findByEmail = (loginEmail, loginPassword, result) => {
    sql.query(`SELECT * FROM user WHERE email = ${loginEmail} AND password = ${loginPassword}`, (err, res)=>{
        if(err){
            console.log("Error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found Account: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({kind: "not_found"}, null);
    });
};

module.exports = User;
