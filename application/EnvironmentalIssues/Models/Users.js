module.exports = (sequelize, type) => {
    return sequelize.define('Users', {
        user_ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_Email: {
            type: type.STRING,
            allowNull: false,
            required: [true, 'Email required']
        },
        password: {
            type: type.STRING,
            allowNull: false
        },
        first_Name: {
            type: type.STRING,
            allowNull: false
        },
        last_Name: {
            type: type.STRING,
            allowNull: false
        },
        date_Of_Birth: {
            type: type.DATE,
            allowNull: false
        },
        inactive: {
            type: type.BOOLEAN,
            allowNull: false
        },
        signup_Date: {
            type: type.DATE,
            allowNull: false
        },
        id_Role: {
            type: Int,
            allowNull: false
        }
    })
};