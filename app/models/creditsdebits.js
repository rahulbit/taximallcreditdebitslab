const mongoose = require('mongoose'),

Schema  = mongoose.Schema;

let creditsdebitsSchema = new Schema({

    distance:{
        type:'Number',
        default:''
    },

    transactionId:{
       type:'String',
       default:'',
       unique:'true'
    },
    
    driverId:{
     type :'String',
      default:'',

    },

   
    vehicleId:{
        type:'String',
        default:' '
    },

    bookingId:{
        type:'String',
        default:''
    },

    credits:{
        type:'Number',
        default:''
    }

})

mongoose.model('creditsdebits' , creditsdebitsSchema );