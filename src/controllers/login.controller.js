const User = require("../models/login.model");

//create and save a new user
exports.create = (req, res) => {
    //validate request
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    //console.log("Request body: ", JSON.stringify(req.body));
    //Create a user
    const usuario = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
        //registerType = login.registerType;//revisar como excluirlo del modelo, ya que no esta incluido en la tabla, verificarlo con middleware xD
    });
    let isValidCheckedUser = true;
    let pruebita;

    User.CheckUserRegistered(usuario.userName, usuario.email, (err, result) =>{
        if(err.description === ""){
            //console.log("Resultado query3: " + JSON.stringify(result));
            if(result.length)
            {
                //res.send({message:"El usuario ya existe, intente con uno nuevo."});
                return ({message:"El usuario ya existe, intente con uno nuevo."});
            }
        } else{
            //console.log("Se encontraron errores en la query");
            //res.send({message:`${err.description}`});
            return ({message:`${err.description}`});
        }
    });

    console.log("USUARIO PRUEBA: " + usuario);
    console.log("USUARIO PRUEBA: " + isValidCheckedUser);
    console.log("USUARIO PRUEBA: " + pruebita);
    if(!isValidCheckedUser){
        console.log("USUARIO PRUEBA2: ");
    }
    //Save user in the DB
    /*User.create(usuario, (err, data) => {
        if(err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Customer."
            });
        else res.send(data);
    });*/
};

exports.findOne = (req, res) => {
    Login.findByEmail(req.params.loginEmail, req.params.loginPassword, (err, data) =>{
        if(err){
            if(err.kind === "not_found"){
                res.status(404).send({
                    message: `Not found Account ${req.params.loginEmail}.`
                });
            } else{
                res.status(500).send({
                    message: "Error retrieving Account " + req.params.loginEmail
                });
            }
        } else res.send(data);
    });
};
