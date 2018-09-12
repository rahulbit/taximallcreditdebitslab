


const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let slabSchema = new Schema({



    startdate: {

        type: 'Date',
        default: ''
      

    },

    enddate:{

        type:'String',
        default:''

    },
    


    minslab: {

        type: 'Number',
        default: ''
    },

    minslab1: {

        type: 'Number',
        default: ''
    },

    maxslab: {

        type: 'Number',
        default: ''
    },

    minslabvalue: {
        type: 'Number',
        default: ''
    },
    minslabvalue1: {
        type: 'Number',
        default: ''
    },

    maxslabvalue: {
        type: 'Number',
        default: ''
    },

    status:{
       type:'String',
       default:''
    }

   

     





})

mongoose.model('slabs', slabSchema)