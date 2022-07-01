const mongoose = require('mongoose');
const mongooseURI = 'mongodb+srv://mithun_user:mithun_pass@cluster1.rgoycfp.mongodb.net/iNotebook'

const connectToMongo = () => {
    mongoose.connect(mongooseURI, () => {
        console.log('connected to Mongo Successfully');
    })
}

module.exports = connectToMongo;