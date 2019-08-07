var express = require('express');
var router = express.Router();

var search = require('../javascript/search.js');

router.use('/about', require('./about.js'));
router.use('/about/forms', require('./forms.js'));
router.use('/users', require('./users.js'));
router.use('/profile',require('./profile.js'));
const models = require('../models');
//router.use('/signup',require('./signup.js'));

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.render('index', { title: 'CSC 648 Team 1 Home Page' });
// });

router.get('/results', function(req, res, next) {
    search.find(req, function(err, data) {
        if (err) {
            res.send('Error querying Database');
        } else {
            res.render('results', {
                data: data,
                title: "Results page"
            });
        }
    });
    //search.close(req);
});

// To get recent incidents in homepage
router.get('/',async function(req, res) {
    // find all incidents from database
      const resultP = models.incidents.findAll({limit:5})
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
          const result = await resultP;
        res.render('index', { data: result, title: 'CSC 648 Team 1 Home Page'  })
        //res.json({data: await resultP});
    
    });
    


router.get('/header', function (req, res, next){
    res.render('header');
});

router.get('/footer', function(req, res, next) {
    res.render('footer');
});

module.exports = router;