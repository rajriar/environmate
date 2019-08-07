//const db = require('./dbConnection');
//const fs = require('fs');
const multer = require('multer')
const upload = multer({})
const imageThumbnail = require('image-thumbnail');

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
  let _userId        = null;

  if (req.cookies && req.cookies.user){
    _userId = req.cookies.user.id;
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
      //console.log(location.dataValues);
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
      status        : _status,
      userId        : _userId // Todo use sessions
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
    description      : req.body.description, 
  })
  .then(incident => {
      console.log("Incident's's auto-generated ID:", incident.incidentId);
       incident.setType(req.body.idType);
       incident.setLocation(locationObj.locationId);
       incident.setUser(userId);
      //console.log(Object.keys(incident.__proto__));
      incident.setStatus(RECEIVED_STATUS);
      //return incident; 
      return incident;
  })
  //create new image and thumbnail of that image
  .then(newIncident=>{
    imageThumbnail(base64encodedImg)
    .then(thumbnail => {
      const thumbnailImage = thumbnail.toString('base64');
      models.image.create({image: base64encodedImg,thumbnail:thumbnailImage, incidentIncidentId: newIncident.incidentId})
    .then((img)=>{
      console.log("img id"+ img.imageId);
      //img.setincidentID(newIncident.incidentId); //possible error here
      res.render('./incidents/details.ejs', {id:newIncident.incidentId, result :'new incident created '+newIncident.incidentId, title: 'CSC 648 Team 1 Home Page' })
    })  
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


// Request to view a specific incident
router.get('/view/:incidentId', async function (req, res) {
  models.incidents.findOne({
      where: {incidentId: req.params.incidentId},
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
  }).then(incident =>{
    if(req.cookies.role === "Admin"){
      //change to actual admin page
      res.render('../views/incidents/details',{title: "results page", data: incident})
    }
    else{
      res.render('../views/incidents/details',{title: "results page", data: incident})
    }

  });
});

// for details incident page
router.get('/details', function (req, res) {
  res.render('../views/incidents/details', { title: 'Incident Details' })
});


// Request to view all incidents
router.get('/view',async function(req, res) {
// find all incidents from database
  const resultP = models.incidents.findAll()
    .map( incident => {
        const imagePromise = models.image.findAll({  
          where: {
            incidentIncidentId: incident.incidentId,
            
          },
          
        })
        // create all promises needed for the response object
        .then(resolvedImages => { 
          const img = resolvedImages[0].image;
          const tNail = resolvedImages[0].thumbnail;
          return Promise.resolve({image: img, thumbnail: tNail});
        });
  
        const locationPromise =  incident.getLocation()
          .then(resolvedLoc => {
            return resolvedLoc.getZipcode()
              .then(resolvedZip => {
                return Promise.resolve({location: resolvedLoc.locationName, zipCode: resolvedZip.zipCode});
              })
          });

        const statusPromise =  incident.getStatus()
          .then(resolvedStatus => {
            return Promise.resolve({status: resolvedStatus.statusName});
          });

        const typePromise =  incident.getType()
          .then(resolvedType => {
            return Promise.resolve({type: resolvedType.typeName});
          });
      
        const userPromise = incident.getUser()
          .then(resolvedUser => {
            return Promise.resolve({user: resolvedUser.userEmail});
          });
        // create a promise.all to resolve all promises
        return Promise.all([Promise.resolve(incident), imagePromise, locationPromise, statusPromise, typePromise, userPromise]);
      }).map(incidentFieldsP => {
        console.log(incidentFieldsP);
        // return the json object for the response
        return {
            incidentId: incidentFieldsP[0].incidentId, 
            incidentDescription: incidentFieldsP[0].description,
            incidentDate:incidentFieldsP[0].createdAt, 
            image: incidentFieldsP[1].image,
            thumbnailImage: incidentFieldsP[1].thumbnail,
            location: incidentFieldsP[2].location,
            zipCode: incidentFieldsP[2].zipCode,
            status: incidentFieldsP[3].status,
            type: incidentFieldsP[4].type,
            user: incidentFieldsP[5].user
          };
      })
      .catch(function (err) {
        // catch statement for debugging
        console.log(`Something bad happened: ${err}`);
        res.json({
          viewIncident: `${err}`
        });
      });
  
    res.json({data:await resultP});

});


module.exports = router;