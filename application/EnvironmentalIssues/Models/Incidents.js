module.exports = (sequelize, type) => {
    return sequelize.define('incidents', {
        INCIDENT_ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ID_TYPE: {
            type: type.INTEGER,
            allowNull: false
        },
        ID_LOCATION: {
            type: type.INTEGER,
            allowNull: false
        },
        DESCRIPTION: {
            type: String,
            allowNull: false
        },
        ID_USER: {
            type: type.INTEGER,
            allowNull: false
        },
        ID_STATUS: {
            type: type.INTEGER,
            allowNull: false,
        },
        REPORTED_DATE_TIME: {
            type: type.DATE,
            allowNull: false
        }
    })
};