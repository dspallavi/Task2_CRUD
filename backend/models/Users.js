const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Users = new Schema({
   user_name: {
      type: String
   },
   password: {
      type: String
   },
   user_id: {
      type: String
   },
   role: {
      type: String
   },
   department : {
       type : String
   }
}, {
   collection: 'users'
})

module.exports = mongoose.model('Users', Users)