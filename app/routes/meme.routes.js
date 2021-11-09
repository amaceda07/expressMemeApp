const { meme } = require("../models");

module.exports = app => {
    const memes = require("../controllers/meme.controler");


    var router = require("express").Router();

    // create a new image
    router.post("/", memes.create);

    // retrieve all images

    router.get("/", memes.findAll);

    // search meme by id

    router.get("/:id", memes.findOne);


    router.put("/:id", memes.update);

    // delete meme
    router.delete("/:id", memes.delete);


    app.use('/api/memes', router)
};