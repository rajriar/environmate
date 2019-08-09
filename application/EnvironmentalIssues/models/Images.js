/*
* Author: Johnathan Le
* Author: Jonthan Julian
* updated: 8.8.2019
* Function -- db model for images.
*/
const models = require('../models');
module.exports = function(sequelize, DataTypes) {
	const image =  sequelize.define('image', {
		imageId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			//field: 'IMAGE_ID'
			
		},
		image: {
			type: DataTypes.TEXT("long"),
			allowNull: true,
			//field: 'IMAGE'
			
		},
		thumbnail: {
			type: DataTypes.TEXT("long"),
			allowNull: true,
			//field: 'IMAGE'
			
		},
	}, {
		tableName: 'image',
		timestamps : false
	});
	// image.associate = (models)=>{
	// 	image.belongsTo(models.incidents,{ 
	// 		as: 'IncidentID' ,
	// 		through: 'IncidentsImages'
	// 	});
	// }

	return image;
};