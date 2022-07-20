const mongoose = require('mongoose');
const { Schema } = mongoose;

const topicSchema = new Schema({
    title:{
        type: String
    },
    description:{
        type: String
    }
    });
  const MainTopic = mongoose.model('MainTopic', topicSchema);
  module.exports = MainTopic;
  