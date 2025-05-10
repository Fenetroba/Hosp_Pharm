import mongoose from "mongoose";

const NotificationSchema=new mongoose.Schema({
     title:{type:String, required:true },
     desctiption:{type:String, required:true },


},{timestamps:true})
const Notify= mongoose.model("Notification",NotificationSchema);
export default Notify;