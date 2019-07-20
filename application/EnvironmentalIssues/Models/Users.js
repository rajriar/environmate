module.exports = (sequelize, type) => {
    const User = sequelize.define('users', {
        USER_ID: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        USER_EMAIL: {
            type: type.STRING,
            allowNull: false,
            unique: true,
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
        DATE_OF_BIRTH: {
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
    },{
        hooks:{
            beforeCreate: (user, options) => {
                return bcrypt.hash(user.PASSWORD, 10)
                .then(hash => {
                    users.PASSWORD = hash;
                    console.log(user.PASSWORD);
                })
                .catch(err => {
                    throw new Error();
                });
                }
            }
        }
    );
    
    User.prototype.comparePassword = async function(PASSWORD) {
        return await bcrypt.compare(PASSWORD, this.PASSWORD);
    };

    return User;
};