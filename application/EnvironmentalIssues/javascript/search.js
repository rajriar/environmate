const models = require('../models');
const sequelize = require ('sequelize');
const op = sequelize.Op;

var find = async function(request, callback) {

    if(request.query.search_text === ""){
        var results = await models.incidents.findAll({
            include: [
                {all:true}
            ]
        });
        results = JSON.parse(JSON.stringify(results));
        console.log(results);
        callback(null, results);
    }
    else{
        var results = await models.incidents.findAll({
            where: {
                [op.or]:{
                    description :{
                        [op.like] : '%'+request.query.search_text+"%" 
                    }
                }
            },
            include:[
                {all: true}
            ]
        });
        results = JSON.parse(JSON.stringify(results));
        callback(null, results);
    }
}

module.exports = {
    find: find
}