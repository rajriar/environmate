/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('zipCodes', {
		zipId: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'ZIP_ID'
		},
		zipCode: {
			type: DataTypes.INTEGER(5),
			allowNull: false,
			unique: true,
			field: 'ZIP_CODE'
		}
	}, {
		tableName: 'zip_codes',
		timestamps: false
	});
};