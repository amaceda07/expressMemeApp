
const db = require("../models");
const User = db.user;
const OP = db.Sequelize.Op;
const jwt = require('jsonwebtoken');


exports.create = (req, res) => {
    if (!req.body.Nick) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    var crytp = require("crypto");
    var hash = crytp.createHash("md5").update(req.body.Password).digest('hex')

    const user = {
        Nick: req.body.Nick,
        Nombre: req.body.Nombre,
        Password: hash,
        Mail: req.body.Mail,
    };

    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Ocurrió un error cuando se intentó crear el User"
            });
        });

};

exports.findAll = (req, res) => {

    console.log("entré a la función");

    const nombre = req.query.nombre;

    var condition = nombre ? { nombre: { [OP.like]: `%${nombre}%` } } : null;

    User.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error cuando se intentó buscar la información"
            }); // end | res.status
        }); // end | catch
};


exports.update = (req, res) => {
    const uuid = req.params.id;

    User.update(req.body, {
        where: { UUID: uuid }
    })// end | Meme Update

        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Se ha actualizado correctamente la imagen"
                });
            } // end | if success
            else {
                res.send({
                    message: `No se actualizó la imagen con ID =${uuid}. Puede que no se haya encontrado o esté nulo`
                });
            } // end | else
        }) // end then
        .catch(err => {
            res.status(500).send({
                message: "Error actualizando la imagen con id=" + req.body.Nick
            });
        });

};

exports.delete = (req, res) => {
    const uuid = req.params.id;

    Meme.destroy({
        where: { UUID: uuid }
    })
        .then(num => {
            if (num == 1) {
                message: "El usuario se elimina exitosamente!"
            } // end if
            else {
                message: "Ups! No pude eliminar el usuario"
            } // end else
        }) // end then
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la imagen id=" + id
            });
        });
};

exports.autentica = (req, res) => {

    var crytp = require("crypto");
    var hash = crytp.createHash("md5").update(req.body.Password).digest('hex')

    const user = {
        Nick: req.body.Nick,
        Password: hash,
    };


    User.findAll({
        where: {
            Nick: { [OP.eq]: user.Nick },
            Password: { [OP.eq]: user.Password }
        }
    })
        .then(data => {
            console.log(data);
            console.log(data.length);
            if (!data) { res.status(500).send(); return; } // end | res.status
            if (data.length == 0) { res.status(401).send(); return; }

            // todo ok

            console.log(data[0].UUID);
            const token = jwt.sign(
                { Nick: user.Nick, hash: data[0].UUID },
                "secret_this_should_be_longer",
                { expiresIn: 60 * 120 }
            );
            const dataRes = {
                mensaje: "Auth Correcta",
                token: token
            }

            res.send(dataRes);

        })


};
