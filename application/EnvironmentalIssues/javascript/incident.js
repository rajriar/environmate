const db = require('./dbConnection');

const express = require("express");
const router = express.Router();
//var app = express();
router.use(express.json());

const incidentDB = require("../models/incidents.js");
//require('moment')().format('YYYY-MM-DD HH:mm:ss');

router.post('/report', function(req, res,next) {

    console.log('req.body');
    console.log(req.body);
    
    var incidentDelails ={
        ID_TYPE : req.body.type,
        ID_LOCATION : req.body.location,
        DESCRIPTION : req.body.description,
        ID_USER : req.body.user_ID,
        ID_STATUS : 1,
        REPORTED_DATE_TIME : new Date()

    }
    db.query('INSERT INTO INCIDENTS SET ?', incidentDelails, function(err,
        result) {
        console.log(result[0]);
        const incident_Id = result.insertId;
        if (err)
         throw err;
        res.json({"incident_ID":incident_Id});
    });
    
});

    


router.put("/edit/:incident_ID", function(req,res,next) {
    console.log('req.params');
    console.log(req.params.incident_ID);
    var incident_id = req.params.incident_ID
    //console.log(req.body);

    var incidentDelails ={
        ID_TYPE : req.body.type,
        ID_LOCATION : req.body.location,
        DESCRIPTION : req.body.description,
        REPORTED_DATE_TIME : new Date()

    }
    db.query('SELECT * FROM INCIDENTS WHERE INCIDENT_ID =? ',[incident_id], function(err,
        result){
        if (err)
           throw err;
        const status = result[0].ID_STATUS;
        if(status == 3 || status == 4){
            res.json({"err": "not valid status"})
        }
        else{
            db.query('UPDATE INCIDENTS SET ? WHERE INCIDENT_ID=?' ,[incidentDelails,incident_id],function(err,
            result){
            if (err)
               throw err;
            res.json({"success":"updated incident","incident_ID":incident_Id})
            });
        }  
    });
});


router.delete('/delete/:incident_ID',function(req,res){
    console.log('req.params');
    console.log(req.params.incident_ID);
    var incident_id = req.params.incident_ID

    db.query('SELECT * FROM INCIDENTS WHERE INCIDENT_ID =? ',[incident_id], function(err,
        result){
        if (err)
           throw err;
        const status = result[0].ID_STATUS;
        //const userID = result[0].ID_USER;
        if(status == 3){
            db.query('DELETE FROM INCIDENTS WHERE INCIDENT_ID=?' ,[incident_id],function(err,
                result){
                if (err)
                   throw err;
                res.json({"success":"deleted incident","incident_ID":incident_Id})
                });
        }
        else{
            res.json({"err": "not valid status"})
        }  
    });
    
    
});


router.get('/',function(req,res){
    db.query('SELECT * FROM INCIDENTS' , function(err,
        result){
        if (err)
            throw err;
        //console.log(result);
        res.json({"incidents": result});
    });
    //res.json({"incident_ID": result[0].INCIDENT_ID});
});

router.get('/view',function(req,res){

    incidentDB.findAll().then(Incidents => {
        console.log("All users:", JSON.stringify(Incidents, null, 4));
      });
});




module.exports = router;