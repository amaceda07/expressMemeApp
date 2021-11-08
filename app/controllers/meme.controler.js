const { meme } = require("../models");
const db = require("../models");
const Meme = db.Meme;
const Op = db.Sequelize.Op;


// Create and Save a new Meme
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const meme = {
        Nombre: req.body.nombre,
        URL: req.body.url,
        CreadoPor: req.body.user,
    }

    // save in db

    Meme.create(meme)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error cuando se intentó crear el MEME"
            });
        });
};

// Retrieve all Memes from the database.
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;

    var condition = nombre ? { nombre: { [OP.like]: `%${nombre}%` } } : null;

    Meme.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error cuando se intentó buscar la información"
            }); // end | res.status
        }); // end | catch
};

// Find a single Meme with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Meme.findByPk(id)
    .then(data => {
        if (data){
            res.send(data);
        }
        else{
            res.status(404).send({
               message: `No se encontró información con el ID = ${id}`
            }); // end | res status 400
        }
    }) // end | then
    .catch(err => {
        res.status(500).send({
           message: "Error, no se pudo obtener la información por ID" 
        }); // end || res status 500
    }); // end | catch
};

// Update a Meme by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Meme.update(req.body, {
        where: { ImagenID: id}
    })// end | Meme Update

    .then(num => {
        if (num == 1){
            res.send({
                message: "Se ha actualizado correctamente la imagen"
            });
        } // end | if success
        else{
            res.send({
                message: `No se actualizó la imagen con ID =${id}. Puede que no se haya encontrado o esté nulo`
              });
        } // end | else
    }) // end then
    .catch(err => {
        res.status(500).send({
          message: "Error actualizando la imagen con id=" + id
        });
      });

};

// Delete a Meme with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
};

// Delete all Memes from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Memes
exports.findAllPublished = (req, res) => {

};