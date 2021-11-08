module.exports = (sequelize, Sequelize) => {
    const Meme = sequelize.define("Meme", {
        ImagenID: { type: Sequelize.INTEGER, primaryKey: true, },
        Nombre: { type: Sequelize.STRING, allowNull: false },
        URL: { type: Sequelize.STRING, allowNull: false },
        CreadoPor: { type: Sequelize.STRING, allowNull: false },
    });


    // Meme.beforeSave((meme, options) => {
    //     meme.ImagenID += 1;
    // });

    return Meme;
};

