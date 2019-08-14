/*
* Author: Johnathan Lee
* updated: 8.8.2019
* Function -- Model for incident table
*/

const bcrypt = require('bcrypt');
const models = require('../models');

'use strict';

module.exports = (sequelize, type) => {
    const users = sequelize.define('users', {
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
        inactive: {
            type: type.BOOLEAN,
            allowNull: false,
            field: 'inactive'
        }},{
            updatedAt: false,
            hooks:{
                beforeCreate: (user, options) =>{
                    return bcrypt.hash(user.password, 10)
                        .then(hash => {
                        user.password = hash;
                        console.log("User Password: ", user.password);
                    })
                .catch(err => { 
                    throw new Error(); 
                });
                }
            }
        }
    );
    (users.prototype.comparePassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    }),
    (users.associate = (models) => {
        users.belongsTo(models.roles, {
            as: 'Role',
            through: 'UserRole'
        });
    })


    return users;
};