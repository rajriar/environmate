module.exports = (sequelize, type) => {
    return sequelize.define('IMAGE', {
        IMAGE_ID: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        IMAGE: {
            type: Sequelize.TEXT('long'),
            defaultValue: null
        },
        ID_INCIDENT: {
            type: type.INTEGER,
            allowNull: false
        }
    })
};