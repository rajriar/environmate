module.exports = (sequelize, type) => {
    return sequelize.define('Incedents', {
        incident_ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        id_Type: {
            type: type.INTEGER,
            allowNull: false
        },
        id_Location: {
            type: type.INTEGER,
            allowNull: false
        },
        description: {
            type: String,
            allowNull: false
        },
        id_User: {
            type: type.INTEGER,
            allowNull: false
        },
        id_Status: {
            type: type.INTEGER,
            allowNull: false,
        },
        reported_Date_Time: {
            type: type.DATE,
            allowNull: false
        }
    })
};