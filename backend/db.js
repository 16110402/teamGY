const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/chat?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;

// use below command on terminal of backend directory to start services of mongoDB
// services.msc
