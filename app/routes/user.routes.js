module.exports = app => {
    const users = require("../controllers/user.controler");


    var router = require("express").Router();

    // create a new USER
    router.post("/", users.create);

    // auth user
    router.post("/auth", users.autentica);

    // retrieve all USERS

    router.get("/", users.findAll);

    // update user
    router.put("/:uuid", users.update);

    // delete USER
    router.delete("/:uuid", users.delete);




    app.use('/api/users', router);

}