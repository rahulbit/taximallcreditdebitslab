const express = require('express');
const router = express.Router();
const slabController = require("./../../app/controllers/slabcontroller.js");
const appConfig = require("./../../appconfig/config");







module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/drivers`;


    // route to fetch slab data
     app.get(`${baseUrl}/getslabdata`, slabController.getslabdata);
     

     app.get( baseUrl+'/getcreditdebits/:bookingId', slabController.getcreditdebit);

    
     app.post(`${baseUrl}/creditdebits`, slabController.calculatecreditdebit);

     // route to post the slabmodel by admin
    app.post(`${baseUrl}/slabs` , slabController.postslabdata);

    // route to delete the slab  by admin
    app.post(`${baseUrl}/deleteslab`, slabController.deleteslab);
    
  

}