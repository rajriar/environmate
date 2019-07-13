module.exports = (sequelize, type) => {
    return sequelize.define('Incedent_type', {
        status_ID: {
            type: Int
        },
        status: {
            type: String
        },
        changed_On: {
            type: Date
        },
        change_By: {
            type: Int
        }
    })
};