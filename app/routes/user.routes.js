module.exports = app => {
    const users = require("../controllers/user.controler");


    var router = require("express").Router();

    // create a new USER
    router.post("/", users.create);

    // retrieve all USERS

    router.get("/", users.findAll);

    // search USER by id

    router.get("/:uuid", users.findOne);

    // update user
    router.put("/:uuid", users.update);

    // delete USER
    router.delete("/:uuid", users.delete);


    app.use('/api/users', router);

}