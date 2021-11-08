const { meme } = require("../models");

module.exports = app => {
    const memes = require("../controllers/meme.controler");


    var router = require("express").Router();

    // create a new image
    router.post("/create", memes.create);

    // retrieve all images

    router.get("/", memes.findAll);

    // search meme by id

    router.put("/:id", memes.update);

    // delete meme
    router.delete("/:id", memes.delete);


    app.use('/api/memes', router)
};