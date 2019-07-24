const bcrypt = require('bcrypt');
'use strict';

module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        userId: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            field: 'USER_ID'
        },
        userEmail: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            required: [true, 'Email required'],
            field: 'USER_EMAIL'
        },
        password: {
            type: type.STRING,
            allowNull: false,
            field: 'PASSWORD'
        },
        firstName: {
            type: type.STRING,
            allowNull: false,
            field: 'FIRST_NAME'
        },
        lastName: {
            type: type.STRING,
            allowNull: false,
            field: 'LAST_NAME'
        },
        dateOfBirth: {
            type: type.DATE,
            allowNull: false,
            field: 'DATE_OF_BIRTH'
        },
        inactive: {
            type: type.BOOLEAN,
            allowNull: false,
            field: 'inactive'
        },
        signupDate: {
            type: type.DATE,
            allowNull: false,
            field: 'SIGNUP_DATE'
        },
        idRole: {
            type: type.INTEGER,
            allowNull: false,
            field: 'ID_ROLE'
        }}, {
            createdAt: false,
            updatedAt: false,
            hooks:{
                beforeCreate: (user, options) =>{
                    return bcrypt.hash(user.password, 10)
                        .then(hash => {
                        user.password = hash;
                        console.log(user.password);
                    })
                .catch(err => { 
                    throw new Error(); 
                });
                }
            }
        },
    );
    users.prototype.comparePassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    },

    users.associate = (models) => {
        User.hasMany(models.Message);
        User.hasMany(models.gamesessions);
    }
};
