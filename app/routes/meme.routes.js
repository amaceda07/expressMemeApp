module.exports = app => {
    const memes = require("../controllers/meme.controler");
    const middleware = require("../controllers/auth.controller");


    var router = require("express").Router();

/**
 * @swagger
 * /images
 * post: 
 *  description: Used to generate a new image in DB
 *  responses: 
 *      '200': 
 *          description: Successful request
 */
    // create a new image
    router.post("/", middleware.validate, memes.create);

    // retrieve all images

    router.get("/", middleware.validate, memes.findAll);

    // search meme by id

    router.get("/:id", middleware.validate, memes.findOne);


    router.put("/:id", middleware.validate, memes.update);

    // delete meme
    router.delete("/:id", middleware.validate, memes.delete);


    app.use('/api/memes', router)
};