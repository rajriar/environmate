/*
* Author: Johnathan Lee
* updated: 8.8.2019
* Function -- db model for incident types.
*/

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('incidentType', {
		typeId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			//field: 'TYPE_ID'
		},
		typeName: {
			type: DataTypes.STRING(45),
			allowNull: false,
			//field: 'TYPE_NAME'
		}
	}, {
		tableName: 'incident_type',
		timestamps: false
	});
};