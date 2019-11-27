const mongoose = require('mongoose');
const DB_CONNECTION_STRING = 'mongodb://localhost:27017/reports';

module.exports = () => {
    
    mongoose.set('useCreateIndex', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useUnifiedTopology', true)
    return mongoose.connect(DB_CONNECTION_STRING, { useNewUrlParser:true})
 
}