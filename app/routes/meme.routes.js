module.exports = app => {
    const memes = require("../controllers/meme.controler");
    const middleware = require("../controllers/auth.controller");


    var router = require("express").Router();

    /**
     * @swagger
     * /images
     * post: 
     *  description: Used to generate a new image on DB
     *  responses: 
     *      '200': 
     *          description: Successful request
     */
    router.post("/", middleware.validate, memes.create);

    // retrieve all images
/**
 * @swagger
 * /images
 * get: 
 * description: Used to get all images on db
 * responses:
 * '200':
 *  description: Successful request
 */
    router.get("/", middleware.validate, memes.findAll);

    /**
     * @swagger
     * /images?id
     * get:
     * description: search an image for given ID
     * responses:
     * '200': 
     *  description: Succesful request
     */

    router.get("/:id", middleware.validate, memes.findOne);


    router.put("/:id", middleware.validate, memes.update);

    // delete meme
    router.delete("/:id", middleware.validate, memes.delete);


    app.use('/api/memes', router)
};