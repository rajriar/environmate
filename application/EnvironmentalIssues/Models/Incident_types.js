module.exports = (sequelize, type) => {
    return sequelize.define('incident_type', {
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