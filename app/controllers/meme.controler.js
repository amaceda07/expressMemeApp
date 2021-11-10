
const db = require("../models");
const Meme = db.meme;
const OP = db.Sequelize.Op;
const sharp = require("sharp");

// Create and Save a new Meme
exports.create = (req, res) => {
    // Validate request

    if (!req.body.Nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const meme = {
        Nombre: req.body.Nombre,
        URL: req.body.URL,
        CreadoPor: req.body.CreadoPor,
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
            if (data) {
                res.send(data);
            }
            else {
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
        where: { ImagenID: id }
    })// end | Meme Update

        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Se ha actualizado correctamente la imagen"
                });
            } // end | if success
            else {
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

    Meme.destroy({
        where: { ImagenID: id }
    })
        .then(num => {
            if (num == 1) {
                message: "La imagen se elimina exitosamente!"
            } // end if
            else {
                message: "Ups! No pude eliminar la imagen"
            } // end else
        }) // end then
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar la imagen id=" + id
            });
        });
};


exports.generateMeme = (req, res) => {
    // first we get Image Object from DB
    console.log(req.body);
    let obj = req.body


    Meme.findByPk(obj.ImagenID)
        .then(data => {
            if (!data) {
                res.status(500).send({
                    message: "No se encontró la imagen en el catálogo"
                });
            }
            let objk = data;

            console.log(data);
            console.log(data.URL);

            let dir = `images/image${data.id}.jpg`;

            downloadImage(objk.URL, dir)
                .then(data => {
                    getMetadata(dir)
                        .then(mt => {
                            console.log(mt);
                            genText(mt.width, mt.height, obj.Posiciones, dir);

                        });


                })
                .catch(
                    console.error
                );

            res.send("OK");
        })
        .catch(err => {

        });

}




const fs = require('fs');
const client = require('https');

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        client.get(url, (res) => {
            if (res.statusCode === 200) {
                res.pipe(fs.createWriteStream(filepath))
                    .on('error', reject)
                    .once('close', () => resolve(filepath));
            } else {
                // Consume response data to free up memory
                res.resume();
                reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));

            }
        });
    });
}


async function getMetadata(dir) {
    try {
        const metadata = await sharp(dir).metadata();
        return metadata;
    } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
    }
}


async function genText(width, height, posiciones, ruta) {
    try {
        const svg = `
        <svg width="${width}" height="${height}">
        <style>
        .title { fill: #001; font-size: 40px; font-weight: bold;}
        </style>
        <text x="50%" y="25%" text-anchor="middle" class="title">${posiciones[0].Arriba}</text>
        <text x="50%" y="75%" text-anchor="middle" class="title">${posiciones[1].Abajo}</text>
        </svg>
        `;
        console.log(svg);

        const svgBuffer = Buffer.from(svg);
        console.log(svgBuffer);
        const img =
            await sharp(ruta).composite([{
                input: svgBuffer,
                top: 0,
                left: 0,
            }])
            .toFile("olakease.png");

            console.log(img);


    } catch (error) {
        console.log(error);
    }
}
