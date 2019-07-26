/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('incidentType', {
		typeId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'TYPE_ID'
		},
		typeName: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'TYPE_NAME'
		}
	}, {
		tableName: 'incident_type',
		timestamps: false
	});
};
