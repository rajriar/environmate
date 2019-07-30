/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('image', {
		imageId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: true,
			
		},
	}, {
		tableName: 'image',
		timestamps : false
	});
};