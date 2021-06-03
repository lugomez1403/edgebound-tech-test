const mongoose = require('mongoose');
const { Schema }  = mongoose;


// Schema para las ordenes mongodb usamos el schema de mongose
const OrderSchema =  new Schema ({
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        status: {
          type : String,
          'default': 'PROCESS',
          required : true
        },
        trackingUrls:{
          type: String
        },
        trackingCodes:{
          type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
      },
      {
        timestamps: true,
      }
);

module.exports = mongoose.model('Order', OrderSchema);