module.exports = (sequelize, type) => {
    return sequelize.define('INCIDENT_TYPE', {
        TYPE_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        TYPE_NAME: {
            type: Datatypes.STRING,
            allowNull: false
        },
    })
};