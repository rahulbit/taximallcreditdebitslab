const mongoose = require('mongoose');

const shortid = require('shortid');

const response = require('./../libs/responselib')

const logger = require('./../libs/loggerlib');

const check = require('./../libs/checklib');

const slabmodel = mongoose.model('slabs');

const moment = require('moment');


const creditdebitModel = mongoose.model('creditsdebits');




// function for deleting the   slab   model
let deleteslab = (req, res) => {

    slabmodel.deleteMany((err, result) => {
        if (err) {
            logger.error(`error occured ${err}`, 'database', 10)
            let apiresponse = response.generate('true', 'some error occured', 500, null)
            res.send(apiresponse);
        }

        else {
            let apiresponse = response.generate('false', 'data deleted  succesfully', 200)
            res.send(apiresponse);

        }
    })
}

// end of function of deleting the slabmodel   by admin



//  function  to set the slabdata by admin

let postslabdata = (req, res) => {

    if (check.isEmpty(req.body.minslab) || check.isEmpty(req.body.minslab1) || check.isEmpty(req.body.maxslab) || check.isEmpty(req.body.minslabvalue) || check.isEmpty(req.body.minslabvalue1) || check.isEmpty(req.body.maxslabvalue)) {
        let apiresponse = response.generate('true', 'required parameter missing', 403, null)
        res.send(apiresponse)
    }

    else {

          
       
     
        let   date = moment().format()
         console.log(date)
         var  enddate = moment(date).add(30 , 'days').format();
           console.log(enddate)


        let newslabdata = new slabmodel({

            

            minslab: req.body.minslab,
            minslab1: req.body.minslab1,
            maxslab: req.body.maxslab,
            minslabvalue: req.body.minslabvalue,
            minslabvalue1: req.body.minslabvalue1,
            maxslabvalue: req.body.maxslabvalue,
            status:req.body.status,
            startdate:Date.now(),
            endDate:enddate
   


        })


        newslabdata.save((err, result) => {

            if (err) {
                logger.error(`error occured ${err}`, 'database', 10)
                let apiresponse = response.generate('true', 'some error occured', 500, null);
                res.send(apiresponse)
            }

            else {
                let apiresponse = response.generate('false ', 'data saved succesfully', 200, result)
                res.send(apiresponse);
                //console.log('slab postd succesfully');
            }



        })


    }

}

// end of function  (to set the slab model by admin)


// function  for fetching the slab data
let getslabdata = (req, res) => {


    slabmodel.findOne({'status':'Active'}, (err, result) => {

        if (err) {
            logger.error(`error ocuured ${err}`, 'database ', 10);
            let apiresponse = response.generate('true', 'some error occured', 500, null);
            res.send(apiresponse);
        }

        else {

            let apiresponse = response.generate('false', ' slab  fetched  ', 200, result)
            res.send(apiresponse);

        }

    })
}

// end of function fetching the slab data


// function to calculate credits and debits



let calculatecreditdebit =(req, res)=>{
    
    if(check.isEmpty(req.body.driverId) || check.isEmpty(req.body.vehicleId) || check.isEmpty(req.body.distance)|| check.isEmpty(req.body.bookingId)|| check.isEmpty(req.body.credits) )
    {

        let apiresponse  = response.generate('true', 'required parameter missing', 403, null)
          res.send(apiresponse); 
    }

    else {



        let distancetravel = req.body.distance;
       
        let Drivercredits = req.body.credits;

        
         // var query = slabmodel.findOne({'status':'Active'});
         // console.log(query)
      

           let Minslabcost = 1.5
           
           let Minslabcost1 =  1.25;
         
            let Maxslabcost = 1
           


            if(distancetravel>0  && distancetravel<=25)
            {

                if(Drivercredits>0)
                {
                      let minslabcost = (distancetravel * Minslabcost);
                      console.log(minslabcost);
                    
                      Drivercredits = Drivercredits - minslabcost
                      console.log(Drivercredits);
                     
                }

                else  if(Drivercredits <0)
                {

                    let minslabcost =(distancetravel * Minslabcost);
                    console.log(minslabcost);
                 
                    Drivercredits = minslabcost -(-Drivercredits)
                    console.log(Drivercredits);
                  

                }

            }

            else if(distancetravel >25 && distancetravel<=50){

                if(Drivercredits>0)
                {
                      let minslabcost1 =  (distancetravel * Minslabcost1)
                      console.log(minslabcost1);
                    
                      Drivercredits = Drivercredits- minslabcost1;
                      console.log(Drivercredits);
                     
                }

                else if(Drivercredits<0)
                {
                     let minslabcost1 = (distancetravel * Minslabcost1)
                     console.log(minslabcost1);
                   
                     Drivercredits = minslabcost1 -(-Drivercredits)
                     console.log(Drivercredits);
                   
                }

            }
            

            else if(distancetravel > 50 && distancetravel <=100)
            {

                if(Drivercredits>0)
                {
                    let   maxslabcost = distancetravel * Maxslabcost;
                    console.log(maxslabcost)
                   
                     Drivercredits = Drivercredits - maxslabcost;
                    console.log(Drivercredits);
                   
                }

                else if(Drivercredits<0)
                {
                   let maxslabcost = distancetravel *Maxslabcost;
                   console.log(maxslabcost);
                 
                   Drivercredits = maxslabcost -(-Drivercredits);
                   console.log(Drivercredits);
                 

                }

            }

        let newdata = new creditdebitModel ({

              driverId : req.body.driverId,
              bookingId : req.body.bookingId,
              transactionId :shortid.generate(),
               distance:req.body.distance,
               vehicleId:req.body.vehicleId,
               credits:Drivercredits,


        })


        newdata.save((err, result)=>{
            if(err)
            {
                logger.error(`error occured ${err}`, database, 10);
                let apiresponse = response.generate('true' , 'some error occured' , 500, null)
                res.send(apiresponse);

            }

            else {
                let apiresponse = response.generate('false', ' creditsanddebits calculated succesfully', 200 , result)
                res.send(apiresponse);
            }

        })
    }

}


// end of function to calculate credit and debits



let getcreditdebit =(req, res)=>{

    if(check.isEmpty(req.params.bookingId))
    {
        let apiresponse = response.generate('true', 'required parameter is missing', 403, null);
        res.send(apiresponse);
        console.log(apiresponse);
    }

    else 
    {


         creditdebitModel.findOne({'bookingId':req.params.bookingId},(err, result)=>{

            if(err)
            {
                logger.error(`some error occured ${err}`, 'database', 10);
                let  apiresponse = response.generate('true', 'some error occured', 500, result)
                res.send(apiresponse)
                console.log(err)
            }

            else {
                let apiresponse = response.generate('false' , 'data fetched succesfully' , 200, result)
                res.send(apiresponse);
                console.log(result)
            }
         })

    }

}





module.exports = {

    postslabdata: postslabdata,
    getslabdata: getslabdata,
    deleteslab: deleteslab,
    calculatecreditdebit:calculatecreditdebit,
    getcreditdebit:getcreditdebit



}