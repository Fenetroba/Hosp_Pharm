import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
 role:{
     type:String,
     enum:["Admin","doctor","Pharma"],
     required:true,
 },
 date: {
  type: Date,
  required: [true, 'Date is required'],
  default: Date.now
},
});
const User = mongoose.model("User", userSchema);
export default User;