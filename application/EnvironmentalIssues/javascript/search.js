const db = require('./dbConnection');

var find = function(request, callback) {


    //BASE QUERY JOINS ALL "FOREIGN KEY TABLES AND DISPLAYS ALL RESULTS"
    var sql = "SELECT i.INCIDENT_ID, i.DESCRIPTION, i.REPORTED_DATE_TIME," + //GRABS INFO STORED IN INCIDENT TABLE
        " it.TYPE_NAME," + //GRABS INCIDENT TYPE
        " istatus.STATUS_NAME," + //GRABS STATUS NAME FROM TABLE
        " loc.LOCATION_NAME, zip.ZIP_CODE," + //GRABS LOCATION NAME AND ZIP FROM TABLES
        " images.IMAGE as IMAGE" + //GRABS IMAGE
        " FROM incidents i" +
        " INNER JOIN incident_type it ON i.ID_TYPE = it.TYPE_ID" + //JOINS TYPE TO INCIDENT TABLE
        " INNER JOIN incident_status istatus ON i.ID_STATUS = istatus.STATUS_ID" + //JOINS STATUS TO INCIDENT TABLE
        " INNER JOIN location loc ON i.ID_LOCATION = loc.LOCATION_ID" + // JOINS LOCATION TO INCIDENT TABLE
        " INNER JOIN zip_codes zip ON loc.ID_ZIP_CODE = zip.ZIP_ID" + // JOINS ZIP TO TO LOCATION TABLE
        " LEFT OUTER JOIN image images ON i.INCIDENT_ID = images.ID_INCIDENT"; // JOINS IMAGE TO INCIDENT TABLE

    if (request.query.search_field === 'ZIP') {
        sql += " WHERE zip.ZIP_CODE like '%" + request.query.search_text + "%'";
    } else if (request.query.search_field === 'STATUS') {
        sql += " WHERE istatus.STATUS_NAME like '%" + request.query.search_text + "%'";
    } else if (request.query.search_field === 'TYPE') {
        sql += " WHERE it.TYPE_NAME like '%" + request.query.search_text + "%'";
    }

    db.query(sql, function(err, result) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, result);

        }
    });

}

module.exports = {
    find: find
}