
const db = require('./dbConnection');

var find = function(request, callback){
    if(db.state === 'disconnected'){
        db.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        });
    }
    var sql = "SELECT  u.*,r.role_name FROM USERS u INNER JOIN ROLES r on u.role = r.role_id WHERE u."+request.query.search_field +" like '%" + request.query.search_text + "%'";
    if(request.query.search_field === 'ROLE'){
        sql = "SELECT u.*,r.role_name FROM USERS u INNER JOIN ROLES r on u.role = r.role_id where r.role_name like '%"
                +request.query.search_text + "%'";
    }
    db.query(sql, function (err, result) {
        if (err) callback(err, null);
        else{ callback(null, result);
            
        }
        db.close();
    });
    

}


module.exports = {
    find: find
};
