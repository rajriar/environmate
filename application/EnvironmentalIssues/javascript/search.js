/*
Author : Jonathan Julian
Function : provides search and returns all if no text is searched.
Date: 8/6/2019

*/


const models = require('../models'); //map to model folder
const sequelize = require ('sequelize'); //import statement for sequelize
const op = sequelize.Op; //shortcut to operations in sequelize

var find = function(request, callback) {
    var results=[];
    if(request.query.search_text === ""){ //checks for no text returns all entries
        models.incidents.findAll({
            include: [ //includes associations defined in models
                {
                    association: 'Location',
                    include:[ //2nd level association in location model
                        { 
                            association: 'Zipcode',
                            required: true
                        }

                    ],
                    required: true //required true == inner join 
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
                    required: false //return false == left outter join
                }
            ]
        }).then(incidents =>{
            callback(null, incidents) //returns incidents to front
        });
    }
    else{ //text has been searched.
        models.incidents.findAll({
            where:{ //search criteria
                [op.or]:{ //or condition
                    description:{ //searches main table
                        [op.like] : "%"+request.query.search_text+"%" //%like search
                    },
                    '$Location.locationName$': { //associates table look up as maintable.AssociatedtableName.tableColumn
                        [op.like] : "%"+request.query.search_text+"%"  
                    },
                    '$Location.Zipcode.zipCode$' : { //2 layers of associated tables
                        [op.like] : "%"+request.query.search_text+"%"
                    },
                    '$Status.statusName$':{
                        [op.like] : "%"+request.query.search_text+"%"
                    },
                    '$Type.typeName$':{
                        [op.like] : "%"+request.query.search_text+"%"
                    }
                }
            },
            include: [ //includes the tables to resolve the host information. 
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
        }).then(incidents => {
                callback(null,incidents); //returns incidents
        });
    }
}

module.exports = {
    find: find
}