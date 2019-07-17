module.exports = (sequelize, type) => {
    return sequelize.define('Incedent_types', {
        type_ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        type_Name: {
            type: Datatypes.STRING,
            allowNull: false
        },
    })
};