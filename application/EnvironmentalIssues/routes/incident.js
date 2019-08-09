/*
* Author: Sandhya sankaran
* Author: Jonathan Julian
* updated: 8.8.2019
* Function -- router for posting/retrieving incident pages.
*/


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



// request to get all values in dropdown in the post incident page
router.get('/report', function (req, res, next) {
  // initialize arrays for each table in database
  let _zipcodes      = [];
  let _locations     = [];
  let _incidentTypes = [];
  let _status        = [];
  let _userId        = null;

  if (req.cookies && req.cookies.user){
    _userId = req.cookies.user.id;
  }

  // fetch necessary stuff from the database from each table
  //fetch zipcodes from zipcode table
  models.zipCodes.findAll()
  .then( results => {
    results.forEach((zipcode) => {
      _zipcodes.push(zipcode.dataValues);
    });
    return models.location.findAll()
  })
  //fetch locations from location table
  .then( results => {
    results.forEach((location) => {
      //console.log(location.dataValues);
      _locations.push(location.dataValues);
    });
    return models.incidentType.findAll();
  })
  //fetch incident types from incidentType table
  .then( results => {
    results.forEach((incidentType) => {
      _incidentTypes.push(incidentType.dataValues);
    });
    return models.incidentType.findAll();
  })
  //fetch status from status table
  .then(results => {
    results.forEach((incidentStatus) => {
      _status.push(incidentStatus.dataValues);
    });
  })
  // Display the post incident page, after getting the values from database
  .then( () => {
    res.render('../views/incidents/report', { 
      title         : 'Post an incident.',
      zipcodes      : _zipcodes,
      locations     : _locations,
      incidentTypes : _incidentTypes,
      status        : _status,
      userId        : _userId // Todo use sessions
    })
  })
  //catch statement for debugging
  .catch( (err) => {
    console.log(`Error fetching data for report page. Details: ${err}`)
    res.send({
      msg: "Error getting data. Try reload."
    });
  })
  
});


// Request to create new incidents

router.post('/report', upload.single('pic') ,function(req, res,next) {
  console.log("req.body of post"+req.body);
// convert the uploaded image to base64 string to store in the database
  const base64encodedImg = req.file.buffer.toString('base64'); 
  const userId           = req.cookies.user.id;
  const locationObj      = JSON.parse(req.body.location);
  
  if(!req.cookies.user){
    // Todo handle unregistered user
    res.send({
      msg: "Login to access this page if your a member. Otherwise join by signing up."
    });
  }
  // create an incident from the body parameters and store them in database 
  models.incidents.create({ 
    description      : req.body.description, 
  })
  .then(incident => {
      console.log("Incident's's auto-generated ID:", incident.incidentId);
      // set all foreign key values in the database
       incident.setType(req.body.idType);
       incident.setLocation(locationObj.locationId);
       incident.setUser(userId);
      //console.log(Object.keys(incident.__proto__));
       incident.setStatus(RECEIVED_STATUS);
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
      // Redirect to incident detail page after creating the incident
      res.redirect('/incidents/view/'+newIncident.incidentId);
      //res.render('../views/incidents/details',{title: "results page", data: incident})
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
  const incident_id = parseInt(req.params.incidentId);
  const user_id = parseInt(req.params.idUser);
  //find the user in user database to check the role
  models.users.findByPk(user_id)
   // Get the user role from userid
    .then(user => {
      const userrole = user.RoleRoleId;
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
            //Change all fields in database including status for admin
            return models.incidents.update({
              TypeTypeId: req.body.idType,
              LocationLocationId: req.body.idLocation,
              description: req.body.description,
              StatusStatusId: req.body.idStatus,
              createdAt: new Date()
            }, {
                where: {
                  incidentId: incident.incidentId
                }
              });
          }
          else {
            // Registered user can change only incidents created by them and cannot change status
            const incidentUserId = incident.UserUserId;
            const status = incident.StatusStatusId;
            //check if the user has created the incident, else throw error
            if (incidentUserId === user_id) {
              console.log(status);
              // if status is resolved or archived, registered user cannot edit them
              if (status === RESOLVED_STATUS || status === ARCHIVED_STATUS) {
                throw "invalid status to change"
              }
              // If status is received or reviewed, registered user can change location, type and description
              return models.incidents.update({
                TypeTypeId: req.body.idType,
                LocationLocationId: req.body.idLocation,
                description: req.body.description,
                createdAt: new Date()
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
    // print the rows that are updated
    .then((rows) => {
      console.log("Done updating" + rows + " rows");
      res.json({ updated: rows });
    })
    // catch statement for debugging
    .catch(function (err) {
      console.log(`Something bad happened: ${err}`);
      res.json({
        updateIncident: "failed to update the incident: " + err
      });
    });
});



// Request to archive an incident by admin

router.delete('/delete/incident/:incidentId/user/:idUser', function (req, res) {
  const incident_id = parseInt(req.params.incidentId);
  const user_id = parseInt(req.params.idUser);
  //console.log(user_id);
  //find the user in user database to check the role
  models.users.findByPk(user_id)
    .then(user => {
      const userRole = user.RoleRoleId;
      // Only admin user can delete an incident from incident table
      if (userRole === ADMIN) {
        models.incidents.destroy({
          where: {
            incidentId: incident_id
          }
        })
        // Also delete the image from image table corresponding to that incident
          .then(() => {
            return models.image.destroy({
              where: {
                incidentIncidentId: incident_id
              }
            })
          })
          // print the rows that are deleted
          .then((rows) => {
            console.log("Done deleting" + rows + " rows");
            res.json({ deleted: rows });
          });
      }
      else {
        res.json({ "delete incident": "user role does not have access " });
      }

    })
    // catch statement for debugging
    .catch(function (err) {
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




// Request to view  all incidents
router.get('/view', async function (req, res) {
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
  }).then(incident =>{
    if(req.cookies.role === "Admin"){
      //change to actual admin page
      res.json({data: incident})
    }
    else{
      res.json({data: incident})
    }

  });
});



module.exports = router;