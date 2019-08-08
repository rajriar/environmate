/*
* Author: Johnathan Le
* updated: 8.8.2019
* Function -- db model for incident status.
*/

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('incidentStatus', {
		statusId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			//field: 'STATUS_ID'
		},
		statusName: {
			type: DataTypes.STRING(45),
			allowNull: false,
			//field: 'STATUS_NAME'
		}
	}, {
		tableName: 'incident_status',
		timestamps: false
	});
};