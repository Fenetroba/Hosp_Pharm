import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, 'Patient name is required'],
    trim: true
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative']
  },
  sex: {
    type: String,
    required: [true, 'Sex is required'],
    enum: ['Male', 'Female', 'Other']
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
    default: Date.now
  },
  doctorName: {
    type: String,
    required: [true, 'Doctor name is required'],
    trim: true
  },
  patientNo: {
    type: String,
    required: [true, 'Patient number is required'],
    unique: true,
    trim: true
  },

  status: {//this is for pharmacist to see the status of the prescription
    type: String,
    enum: ['pending', 'Completed', 'Cancelled'],
    default: 'pending'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  medications: [{
    DrugName: {
      type: String,
      required: true,

  },
  dosage: {
      type: String,
      required: true,
      trim: true
  },
  frequency: {
      type: String,
      required: true,
      trim: true
  },
  duration: {
      type: String,
      required: true,
      trim: true
  },

}] 
 
}, {
  timestamps: true
});


const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;