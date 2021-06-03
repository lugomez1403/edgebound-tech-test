const mongoose = require('mongoose');
const { Schema }  = mongoose;
const bcrypt = require('bcryptjs');

// Schema para gestionar los usuarios
const UserSchema =  new Schema ({
    user: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    rol: {
      type: String,
      required: true,
    }
  }
);

UserSchema.methods.encyptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash( password, salt);
    return hash;
}

UserSchema.methods.matchPassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);