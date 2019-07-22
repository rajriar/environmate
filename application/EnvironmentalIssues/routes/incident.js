const db = require('./dbConnection');
//const fs = require('fs');

const express = require("express");
const router = express.Router();
router.use(express.json());

const models = require('../models');
const ADMIN = 2;
const RESOLVED_STATUS = 3;
const ARCHIVED_STATUS = 4;


// Request to create new incidents
router.post('/report', function(req, res,next) {

    console.log('req.body');
    console.log(req.body);

    models.incidents.create({ idType: req.body.idType, idLocation: req.body.idLocation , description:req.body.description, 
        idUser:req.body.idUser, idStatus:req.body.idStatus,reportedDateTime:new Date()}).then(incident => {
        console.log("Incident's's auto-generated ID:", incident.incidentId);
        return incident;  
      })
      .then((id) => {
        // var imageData  = fs.readFileSync("/Users/viswanathanr/Desktop/logo.png");
        // console.log(imageData);
        // var bufferBase64  = new Buffer(imageData,'binary').toString('base64');
        // console.log(bufferBase64);
        return models.image.create({image : req.body.base64Image , idIncident:id.incidentId});
      })
      .then((img)=> {
          res.json({"incident ID":img.idIncident});
      })
      .catch(function(err) {
        console.log(`Something bad happened: ${err}`);
        res.json({
          createIncident: "failed to create incident"
        });
      });
      

});


// Request to update an incident     
router.put("/edit/incident/:incidentId/userrole/:idUser", function(req,res,next) {
    console.log('req.params');
    console.log(req.params.incidentId);
    const incident_id = parseInt(req.params.incidentId);
    const user_id = parseInt(req.params.idUser);
    console.log(user_id);

    models.incidents.findByPk(incident_id)
    .then(incident => {
        if(user_id === ADMIN){
            console.log("is admin " );
            return models.incidents.update({ idType: req.body.idType, idLocation: req.body.idLocation , description:req.body.description, 
                idStatus:req.body.idStatus, reportedDateTime:new Date()}, {
               where: {
                   incidentId: incident.incidentId
               }
             });   
        }
        const status = incident.idStatus;
        if(status === RESOLVED_STATUS || status === ARCHIVED_STATUS) {
            throw "invalid status"; 
        }
        return models.incidents.update({ idType: req.body.idType, idLocation: req.body.idLocation , description:req.body.description,
            reportedDateTime:new Date()}, {
           where: {
               incidentId: incident.incidentId
           }
         }); 
    })
    .then((rows) => {
        console.log("Done updating"+rows+" rows");
        res.json({updated: rows});
      })
    .catch(function(err) {
        // Really important for debugging too!
        console.log(`Something bad happened: ${err}`);
        res.json({
          updateIncident: "failed to update the incident"
        });
      });


});

    

// Request to archive an incident by admin
router.delete('/delete/incident/:incidentId/userrole/:idUser',function(req,res){
    console.log('req.params');
    console.log(req.params.incidentId);
    const incident_id = parseInt(req.params.incidentId);
    const user_id = parseInt(req.params.idUser);
    console.log(user_id);

    
    if(user_id === ADMIN){
        models.incidents.destroy({
            where: {
              incidentId: incident_id
            }
          }).then((rows) => {
            console.log("Done deleting"+rows+" rows");
            res.json({deleted: rows});
          });
    }
    else{
        res.json({"delete incident": "user role does not have access "});
    }
});



// Request to view all incidents
router.get('/view',function(req,res){

    models.incidents.findAll().then(posts => {
        console.log("All incidents:", JSON.stringify(posts));
        res.json({"incidents":posts });
      });
});


// Request to view a specific incident
router.get('/view/:incidentId',function(req,res){


    const incident_id = parseInt(req.params.incidentId);
    models.incidents.findByPk(incident_id).then(posts => {
        console.log("incidents", JSON.stringify(posts));
        res.json({"incidents":posts });
      });
});




module.exports = router;