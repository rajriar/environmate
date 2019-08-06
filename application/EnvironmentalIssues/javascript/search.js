const models = require('../models');
const sequelize = require ('sequelize');
const op = sequelize.Op;

var find = function(request, callback) {
    var results=[];
    if(request.query.search_text === ""){
        models.incidents.findAll({
            include: [
                {
                    association: 'Location',
                    include:[
                        {
                            association: 'Zipcode',
                            required: true
                        }

                    ],
                    required: true
                },
                {
                    association: 'Status',
                    required: true
                },
                {
                    association: 'Type',
                    required: true
                },
                {
                    model: models.image,
                    required: false
                }
            ]
        }).then(incidents =>{
            console.log(incidents)
            callback(null, incidents)
        });
    }
    else{
        models.incidents.findAll({
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
        }).then(incidents => {
            results = incidents;
        });
        results = JSON.parse(JSON.stringify(results));
        callback(null, results);
    }
}

module.exports = {
    find: find
}