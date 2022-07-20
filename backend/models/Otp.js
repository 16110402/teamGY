const mongoose = require('mongoose');
const { Schema } = mongoose;

const otpSchema = new Schema({
        email:{
            type: String,
            required: true,
            unique: true
        },
        code: String,
        expireIn: Number,
        password:{
            type: String,
            required: true
        }
    },
        {
            timestamps: true
        }
  );
  const otp = mongoose.model('otp', otpSchema);
  module.exports = otp;