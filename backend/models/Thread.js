const mongoose = require('mongoose');
const { Schema } = mongoose;

const threadSchema = new Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        comment:{
            type: String,
            required: true
        },
        date:{
            type: Date,
            default: Date.now
        }
  });

const Thread = mongoose.model('Thread', threadSchema);

module.exports = Thread;
  