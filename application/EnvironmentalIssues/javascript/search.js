const db = require('./dbConnection');

var find = function(request, response){
    var sql = "SELECT * FROM USERS WHERE "+request.query.search_field +" like '%" + request.query.search_text + "%'";
    if(request.query.search_field === 'ROLE'){
        sql = "SELECT * FROM USERS u INNER JOIN ROLES r on u.role = r.role_id where r.role_name like '%"+request.query.search_text + "%'";
    }
    //  db.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log(result);
    //     response = result;
    // });
    response = db.query(sql);
    console.log(response);
}


module.exports = {
    find: find
};
