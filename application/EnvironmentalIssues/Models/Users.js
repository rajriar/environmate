module.exports = (sequelize, type) => {
    return sequelize.define('USERS', {
        USER_ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        USER_EMAIL: {
            type: type.STRING,
            allowNull: false,
            required: [true, 'Email required']
        },
        PASSWORD: {
            type: type.CHAR,
            allowNull: false
        },
        FIRST_NAME: {
            type: type.STRING,
            allowNull: false
        },
        LAST_NAME: {
            type: type.STRING,
            allowNull: false
        },
        DATE_OF_BIRTCH: {
            type: type.DATE,
            allowNull: false
        },
        INACTIVE: {
            type: type.BOOLEAN,
            allowNull: false
        },
        SIGNUP_DATE: {
            type: type.DATE,
            allowNull: false
        },
        ID_ROLE: {
            type: Int,
            allowNull: false
        }
    })
};