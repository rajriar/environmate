/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	const location = sequelize.define('location', {
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
		}
		// is removed due to the association below.
		// idZipCode: {
		// 	type: DataTypes.INTEGER(11),
		// 	allowNull: false,
		// 	field: 'ID_ZIP_CODE'
		// }
	}, {
		tableName: 'location'
	});
	
	/*
		begin building associations after the close of the define, multiple entries can be done in this associate.
		to access this information we first create an instance of the object (Test).  Then we call the object which was created
		then set the field value as shown here.  Test.setID_ZIP_CODE(Some reference to the PRIMARY KEY of the table in which we 
		are pulling the information from)

	 */ 
	location.associate = (models)=>{
		location.belongsTo(models.zipCodes,{ //this defaults to assigning the primary key of the table to the field
			as: 'ID_ZIP_CODE' //this is the name of the field the primary key will be assigned to. 
		});
	}
	return location; //this is returning the object AFTER the associations are built so it's important to return here
};
