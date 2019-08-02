/* jshint indent: 1 */
const models = require('../models');

module.exports = function(sequelize, DataTypes) {
	const incidents =  sequelize.define('incidents', {
		incidentId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			//field: 'INCIDENT_ID'
		},

		description: {
			type: DataTypes.STRING(200),
			allowNull: false,
			//field: 'DESCRIPTION'
		}
	
	}, {
		tableName: 'incidents',
        updatedAt: false
	});

	incidents.associate = (models)=>{
		incidents.belongsTo(models.incidentType,{ 
			as: 'Type' ,
			through: 'IncidentsTypes'
		});
		incidents.belongsTo(models.incidentStatus,{ 
			as: 'Status' ,
			through: 'IncidentsStatus'
		});
		incidents.belongsTo(models.location,{ 
			as: 'Location' ,
			through: 'IncidentsLocations'
		});
		incidents.belongsTo(models.users,{ 
			as: 'User' ,
			through: 'IncidentsUsers'
		});

		// incidents.hasOne(models.image,{ 
		// 	as: 'IncidentID' ,
		// 	through: 'IncidentsImages'
		// });
	}

	return incidents;
};