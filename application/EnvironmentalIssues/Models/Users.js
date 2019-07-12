module.exports = (sequelize, type) => {
    return sequelize.define('Users', {
        user_ID: {
            type: Int,
            primaryKey: true,
            autoIncrement: true
        },
        user_Email: {
            type: String,
            required: [true, 'Email required']
        },
        password: {
            type: String,
            allowNull: false
        },
        first_Name: {
            type: String,
            allowNull: false
        },
        last_Name: {
            type: String
        },
        date_Of_Birth: {
            type: Date
        },
        inactive: {
            type: Boolean
        },
        signup_Date: {
            type: Date
        },
        role: {
            type: Int
        }
    })
};