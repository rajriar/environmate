/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('location', {
		locationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'LOCATION_ID'
		},
		locationName: {
			type: DataTypes.STRING(45),
			allowNull: false,
			field: 'LOCATION_NAME'
		},
		idZipCode: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			field: 'ID_ZIP_CODE'
		}
	}, {
		tableName: 'location',
		timestamps: false
	});
};
