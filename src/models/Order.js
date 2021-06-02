const mongoose = require('mongoose');
const { Schema }  = mongoose;

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