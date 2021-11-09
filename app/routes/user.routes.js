module.exports = app => {
    const users = require("../controllers/user.controler");
    const middleware = require("../controllers/auth.controller");


    var router = require("express").Router();

    // create a new USER
    router.post("/", middleware.validate, users.create);

    // auth user
    router.post("/auth", users.autentica);

    // retrieve all USERS

    router.get("/", middleware.validate, users.findAll);

    // update user
    router.put("/:uuid", middleware.validate, users.update);

    // delete USER
    router.delete("/:uuid", middleware.validate, users.delete);




    app.use('/api/users', router);

}