/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('image', {
		imageId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'IMAGE_ID'
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'IMAGE'
		},
		idIncident: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'ID_INCIDENT'
		}
	}, {
		tableName: 'image',
		createdAt: false, 
		updatedAt: false
	});
};
