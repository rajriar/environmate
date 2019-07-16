module.exports = (sequelize, type) => {
    return sequelize.define('Images', {
        image_ID: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        image: {
            type: Sequelize.TEXT('long'),
            defaultValue: null
        },
        id_Incident: {
            type: type.INTEGER,
            allowNull: false
        }
    })
};