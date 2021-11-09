module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        UUID: { 
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
        },
        Nick: { type: Sequelize.STRING, allowNull: false },
        Nombre: { type: Sequelize.STRING, allowNull: false },
        Password: { type: Sequelize.STRING, allowNull: false },
        Mail: { type: Sequelize.STRING, allowNull: false },
    }); // end User





    return User;

}