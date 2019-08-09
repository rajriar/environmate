/*
* Author: Johnathan Le
* Author: Jonathan Julian
* updated: 8.8.2019
* Function -- Model for incident table
*/
const models = require('../models');
module.exports = function(sequelize, DataTypes) {
	const location = sequelize.define('location', {
		locationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			//field: 'LOCATION_ID'
		},
		locationName: {
			type: DataTypes.STRING(45),
			allowNull: false,
			//field: 'LOCATION_NAME'
		}
		
	}, {
		tableName: 'location',
		timestamps: false
	});
	
	
	location.associate = (models)=>{
		models.location.belongsTo(models.zipCodes,{ //this defaults to assigning the primary key of the table to the field
			as: 'Zipcode',
			through:'LocationsZicodes' //this is the name of the field the primary key will be assigned to. 
		});
	}
	return location; //this is returning the object AFTER the associations are built so it's important to return here
};