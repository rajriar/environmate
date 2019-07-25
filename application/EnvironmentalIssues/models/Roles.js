/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('roles', {
		roleId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'ROLE_ID'
		},
		roleName: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'ROLE_NAME'
		}
	}, {
		tableName: 'roles'
	});
};
