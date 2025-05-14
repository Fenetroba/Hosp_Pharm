import mongoose from "mongoose";

const Releted_finance=new mongoose.Schema({
     DrugName:{type:String,required:true},
     Birr:{type:Number,required:true},
     createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        date: {
          type: Date,
          required: [true, 'Date is required'],
          default: Date.now
        },
})