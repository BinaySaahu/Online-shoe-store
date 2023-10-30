const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  User_id:{
    type:String,
    required:true
  },
  Username: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  DateOfBirth: {
    type: String,
    required: true,
  },
  Country: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
});

const UserList = new mongoose.model("Users", UserSchema);

module.exports = UserList;
