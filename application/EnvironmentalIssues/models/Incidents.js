/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const incidents =  sequelize.define('incidents', {
		incidentId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'INCIDENT_ID'
		},
		idType: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'ID_TYPE'
		},
		// idLocation: {
		// 	type: DataTypes.INTEGER(11),
		// 	allowNull: false,
		// 	field: 'ID_LOCATION'
		// },
		description: {
			type: DataTypes.STRING(200),
			allowNull: false,
			field: 'DESCRIPTION'
		},
		idUser: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'ID_USER'
		},
		idStatus: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: '1',
			field: 'ID_STATUS'
		},
		reportedDateTime: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			field: 'REPORTED_DATE_TIME'
		}
	}, {
		tableName: 'incidents',
		createdAt: false, 
		updatedAt: false
	});
	
	incidents.associate = (models)=>{
		models.incidents.belongsTo(models.location,{
			as: 'ID_LOCATION',
			foreignKey: 'ID_LOCATION'
		});
	}

	return incidents;
};
