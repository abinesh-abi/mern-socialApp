let mongoose =  require('mongoose');
const { MONGODB_URL } = require('./basicConfig');

function mongodbConnection(){
mongoose.connect(MONGODB_URL)
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
 .once('open', function() {
  console.log("Database connected");
});
}
module.exports = mongodbConnection