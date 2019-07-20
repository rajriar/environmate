/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'USER_ID'
		},
		userEmail: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'USER_EMAIL'
		},
		password: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'PASSWORD'
		},
		firstName: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'FIRST_NAME'
		},
		lastName: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'LAST_NAME'
		},
		dateOfBirth: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'DATE_OF_BIRTH'
		},
		inactive: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			field: 'INACTIVE'
		},
		signupDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'SIGNUP_DATE'
		},
		idRole: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'ID_ROLE'
		}
	}, {
		tableName: 'users'
	});
};
