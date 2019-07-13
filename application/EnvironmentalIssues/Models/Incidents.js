module.exports = (sequelize, type) => {
    return sequelize.define('Incedents', {
        incident_ID: {
            type: Int
        },
        type: {
            type: Int
        },
        date: {
            type: Date
        },
        location: {
            type: Int
        },
        image: {
            type: Blob
        },
        zip_Code: {
            type: Int
        },
        description: {
            type: String
        },
        user_ID: {
            type: Int
        },
        status: {
            type: Int
        },
        reported_Time: {
            type: Date
        }
    })
};