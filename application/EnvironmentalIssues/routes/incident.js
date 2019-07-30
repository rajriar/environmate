//const db = require('./dbConnection');
//const fs = require('fs');
const multer = require('multer')
const upload = multer({})

const express = require("express");
const router = express.Router();
router.use(express.json());

const models = require('../models');
const ADMIN = 2;
const RECEIVED_STATUS = 1;
const RESOLVED_STATUS = 3;
const ARCHIVED_STATUS = 4;



// request to get report incident page
router.get('/report', function (req, res, next) {
  let _zipcodes      = [];
  let _locations     = [];
  let _incidentTypes = [];
  let _status        = [];
  
  if(!req.cookies.user){
    // Todo handle unregistered user
    res.send({
      msg: "Login to access this page if your a member. Otherwise join by signing up."
    });
  }

  // fetch necessary stuff from db
  models.zipCodes.findAll()
  .then( results => {
    results.forEach((zipcode) => {
      _zipcodes.push(zipcode.dataValues);
    });
    return models.location.findAll()
  })
  .then( results => {
    results.forEach((location) => {
      console.log(location.dataValues);
      _locations.push(location.dataValues);
    });
    return models.incidentType.findAll();
  })
  .then( results => {
    results.forEach((incidentType) => {
      _incidentTypes.push(incidentType.dataValues);
    });
    return models.incidentType.findAll();
  })
  .then(results => {
    results.forEach((incidentStatus) => {
      _status.push(incidentStatus.dataValues);
    });
  }).then( () => {

    res.render('../views/incidents/report', { 
      title         : 'Post an incident.',
      zipcodes      : _zipcodes,
      locations     : _locations,
      incidentTypes : _incidentTypes,
      status        : _status
    })
  }).catch( (err) => {
    console.log(`Error fetching data for report page. Details: ${err}`)
    res.send({
      msg: "Error getting data. Try reload."
    });
  })
  
});


// Request to create new incidents
router.post('/report', upload.single('pic') ,function(req, res,next) {
  console.log(req.body);

  const base64encodedImg = req.file.buffer.toString('base64'); 
  const userId           = req.cookies.user.id;
  const locationObj      = JSON.parse(req.body.location);

  // create an incident 
  models.incidents.create({ 
    idType           : req.body.idType, 
    idLocation       : locationObj.locationId , 
    description      : req.body.description, 
    idUser           : userId, 
    idStatus         : RECEIVED_STATUS,
    reportedDateTime : new Date()
  })
  .then(incident => {
      console.log("Incident's's auto-generated ID:", incident.incidentId);
      return incident;  
  })
  // add the image of the incident to images folder
  .then((id) => {
      // var imageData  = fs.readFileSync("/Users/viswanathanr/Desktop/logo.png");
      // console.log(imageData);
      // var bufferBase64  = new Buffer(imageData,'binary').toString('base64');
      // console.log(bufferBase64);

      return models.image.create({ image: base64encodedImg, idIncident: id.incidentId });
    })
    //send response with all details of the incident
    .then((img) => {
      models.incidents.findByPk(img.idIncident)
        .then(incident => {
          const incidentResponse = JSON.parse(JSON.stringify(incident));
          incidentResponse.image = img.image;
          res.json({ "incident": incidentResponse });
        })
    })
    //catch statement for debugging
    .catch(function (err) {
      console.log(`Something bad happened: ${err}`);
      res.json({
        createIncident: "failed to create incident"
      });
    });

});



// Request to update an incident     
//change it to post
router.put("/edit/incident/:incidentId/user/:idUser", function (req, res, next) {
  console.log('req.params');
  //console.log(req.params.incidentId);
  const incident_id = parseInt(req.params.incidentId);
  const user_id = parseInt(req.params.idUser);
  models.users.findByPk(user_id)
   // Get the user role from userid
    .then(user => {
      const userrole = user.idRole;
      //console.log("userrole");
      return userrole;
    })
    .then(userRole => {
      console.log(userRole);
      return models.incidents.findByPk(incident_id)
        .then(incident => {
          // Admin can change all fields including status
          if (userRole === ADMIN) {
            //console.log("admin");
            return models.incidents.update({
              idType: req.body.idType, idLocation: req.body.idLocation, description: req.body.description,
              idStatus: req.body.idStatus, reportedDateTime: new Date()
            }, {
                where: {
                  incidentId: incident.incidentId
                }
              });
          }
          else {
            // Registered user can change only incidents created by them and cannot change status
            const incidentUserId = incident.idUser;
            const status = incident.idStatus;
            if (incidentUserId === user_id) {
              console.log(status);
              if (status === RESOLVED_STATUS || status === ARCHIVED_STATUS) {
                throw "invalid status to change"
              }
              return models.incidents.update({
                idType: req.body.idType, idLocation: req.body.idLocation, description: req.body.description,
                reportedDateTime: new Date()
              }, {
                  where: {
                    incidentId: incident.incidentId
                  }
                });
            }
            throw "user does not have access"
          }
        });
    })
    .then((rows) => {
      console.log("Done updating" + rows + " rows");
      res.json({ updated: rows });
    })
    .catch(function (err) {
      // catch statement for debugging
      console.log(`Something bad happened: ${err}`);
      res.json({
        updateIncident: "failed to update the incident: " + err
      });
    });
});



// Request to archive an incident by admin
router.delete('/delete/incident/:incidentId/user/:idUser', function (req, res) {
  //console.log('req.params');
  //console.log(req.params.incidentId);
  const incident_id = parseInt(req.params.incidentId);
  const user_id = parseInt(req.params.idUser);
  //console.log(user_id);
  models.users.findByPk(user_id)
    .then(user => {
      const userRole = user.idRole;
      // Only admin user can delete an incident
      if (userRole === ADMIN) {
        models.incidents.destroy({
          where: {
            incidentId: incident_id
          }
        })
          .then(() => {
            return models.image.destroy({
              where: {
                idIncident: incident_id
              }
            })
          })
          .then((rows) => {
            console.log("Done deleting" + rows + " rows");
            res.json({ deleted: rows });
          });
      }
      else {
        res.json({ "delete incident": "user role does not have access " });
      }

    })
    .catch(function (err) {
      // catch statement for debugging
      console.log(`Something bad happened: ${err}`);
      res.json({
        deleteIncident: `${err}`
      });
    });

});



// Request to view all incidents
router.get('/view', function (req, res) {
  models.incidents.findAll()
    .then(incidents => {
      // map images to each incident to send them in a reponse
      promiseOfImages = incidents.map(inc => {
        return models.image.findAll({
          where: {
            idIncident: inc.incidentId
          }
        }).then(imageRes => {
          //console.log("Img from map = ");
          const incidentResponse = JSON.parse(JSON.stringify(inc));
          incidentResponse.image = imageRes[0];
          //console.log(incidentResponse);
          return incidentResponse;
        })
      });
      return Promise.all(promiseOfImages)
    }).then(incidentImages => {
      res.json({incidentResponse: incidentImages.map(incImg => {
        if (incImg.image != null) {
          const respImage = JSON.parse(JSON.stringify(incImg));
          respImage.image = respImage.image.image;
          return respImage;
        }
        else {
          const respImage = JSON.parse(JSON.stringify(incImg));
          respImage.image = "";
          return respImage;
        }
      })});
      //res.json(incidentImages);
    })
    .catch(function (err) {
      // catch statement for debugging
      console.log(`Something bad happened: ${err}`);
      res.json({
        viewIncident: `${err}`
      });
    });
});



// Request to view a specific incident
router.get('/view/:incidentId', function (req, res) {
  const incident_id = parseInt(req.params.incidentId);
  models.incidents.findByPk(incident_id).then(incident => {
    //Get image of the incident and add it to the response
    models.image.findAll({
      where: {
        idIncident: incident.incidentId
      }
    })
      .then(img => {
        const incidentResponse = JSON.parse(JSON.stringify(incident));
        console.log(img);
        incidentResponse.image = img[0].image;
        console.log(incidentResponse);
        res.json({ incidentResponse });
      })
  })
  .catch(function (err) {
    // catch statement for debugging
    console.log(`Something bad happened: ${err}`);
    res.json({
      viewIncident: `${err}`
    });
  });
});



module.exports = router;