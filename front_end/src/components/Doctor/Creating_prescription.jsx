import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { create__Prescription } from "@/store/prescription"; // Ensure this import exists
import CRUD_Functions from './CRUD_Functions'; // Import the CRUD_Functions component
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner";
import 'react-toastify/dist/ReactToastify.css';

const Creating_prescription = ({user}) => {

  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(false);
  const [patientDetail, setPatientDetail] = useState({
    patientName: "",
    address: "",
    age: 0,
    sex: "Male",
    patientNo: "",
    date: new Date().toISOString().split('T')[0], // Initialize date to today's date in YYYY-MM-DD format
    status: "pending", // Initialize status
    doctorName: user.username,
    medications: [],
  });


  const [newMedication, setNewMedication] = useState({
    DrugName: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "", // Add notes field
  });

  const [seePrescription, setSeePrescription] = useState(false);

  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!patientDetail.patientName) {
      errors.patientName = "Patient Name is required";
    }
    if (!patientDetail.address) {
      errors.address = "Address is required";
    }
    if (patientDetail.age <= 0) {
      errors.age = "Age must be greater than 0";
    }
    if (!patientDetail.patientNo) {
      errors.patientNo = "Patient No is required";
    }
    if (!patientDetail.date) {
      errors.date = "Date is required";
    }
    if (!patientDetail.doctorName) {
      errors.doctorName = "Doctor Name is required";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddMedication = () => {
    setPatientDetail((prevState) => {
      const updatedMedications = [...prevState.medications, newMedication];
      // Reset newMedication *after* updating patientDetail
      const newState = {
        ...prevState,
        medications: updatedMedications,
      };
      setNewMedication({
        DrugName: "",
        dosage: "",
        frequency: "",
        duration: "",
        notes: "", // Reset notes as well
      });
      return newState;
    });
  };

  const CreatePrescription = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    toast("Creating prescription...");

    if (validateForm()) {
      try {
        await dispatch(create__Prescription(patientDetail)); // Await the action
        console.log(patientDetail);
        // Reset patient details after creating prescription
        setPatientDetail({
          patientName: "",
          address: "",
          age: 0,
          sex: "Male",
          patientNo: "",
          date: new Date().toISOString().split('T')[0], // Reset date to today's date
          status: "pending", // Reset status
          medications: [],
        });
        setSeePrescription(false); // Hide the prescription form after submission
        setValidationErrors({}); // Clear validation errors
        toast.success('Prescription created successfully!');
      } catch (error) {
        toast.error(error.message || 'Failed to create prescription.');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.9 }}
      className="relative  bg-[var(--one)] flex flex-col space-y-4 p-5"
    >

     <Toaster/>
      <CRUD_Functions /> 

      <div className="flex flex-col gap-4 bg-[var(--six)] p-4 rounded-md">
        <label htmlFor="patientName">Patient Name</label>
        <input
          className={`border-2 bg-blue-100 rounded-md p-2 ${validationErrors.patientName ? 'border-red-500' : ''}`}
          type="text"
          id="patientName"
          name="patientName"
          value={patientDetail.patientName}
          onChange={(e) =>
            setPatientDetail({
              ...patientDetail,
              patientName: e.target.value,
            })
          }
        />
        {validationErrors.patientName && <p className="text-red-500">{validationErrors.patientName}</p>}

        <label htmlFor="address">Address</label>
        <input
          className={`border-2 bg-blue-100 rounded-md p-2 ${validationErrors.address ? 'border-red-500' : ''}`}
          type="text"
          id="address"
          name="address"
          value={patientDetail.address}
          onChange={(e) =>
            setPatientDetail({
              ...patientDetail,
              address: e.target.value,
            })
          }
        />
        {validationErrors.address && <p className="text-red-500">{validationErrors.address}</p>}

        <label htmlFor="age">Age</label>
        <input
          className={`border-2 bg-blue-100 rounded-md p-2 ${validationErrors.age ? 'border-red-500' : ''}`}
          type="number"
          id="age"
          name="age"
          value={patientDetail.age}
          onChange={(e) =>
            setPatientDetail({
              ...patientDetail,
              age: parseInt(e.target.value) || 0,
            })
          }
        />
        {validationErrors.age && <p className="text-red-500">{validationErrors.age}</p>}

        <div className="flex flex-row gap-2 justify-center items-center">
          <label htmlFor="male">Male</label>
          <input
            type="radio"
            id="male"
            name="sex"
            value="Male"
            onChange={(e) =>
              setPatientDetail({
                ...patientDetail,
                sex: e.target.value,
              })
            }
            checked={patientDetail.sex === "Male"}
          />
          <label htmlFor="female">Female</label>
          <input
            type="radio"
            id="female"
            name="sex"
            value="Female"
            onChange={(e) =>
              setPatientDetail({
                ...patientDetail,
                sex: e.target.value,
              })
            }
            checked={patientDetail.sex === "Female"}
          />
        </div>

        <label htmlFor="patientNo">Patient No</label>
        <input
          className={`border-2 bg-blue-100 rounded-md p-2 ${validationErrors.patientNo ? 'border-red-500' : ''}`}
          type="text"
          id="patientNo"
          name="patientNo"
          value={patientDetail.patientNo}
          onChange={(e) =>
            setPatientDetail({
              ...patientDetail,
              patientNo: e.target.value,
            })
          }
        />
        {validationErrors.patientNo && <p className="text-red-500">{validationErrors.patientNo}</p>}

        <label htmlFor="date">Date</label>
        <input
          className={`border-2 bg-blue-100 rounded-md p-2 ${validationErrors.date ? 'border-red-500' : ''}`}
          type="date" // Use type="date" for date input
          id="date"
          name="date"
          value={patientDetail.date} // Use the date string directly
          onChange={(e) =>
            setPatientDetail({
              ...patientDetail,
              date: e.target.value, // Store the date string
            })
          }
        />
        {validationErrors.date && <p className="text-red-500">{validationErrors.date}</p>}

        <label htmlFor="doctorName">Doctor Name</label>
        <input
          className={`border-2 bg-blue-100 rounded-md disabled p-2 ${validationErrors.doctorName ? 'border-red-500' : ''}`}
          type="text"
          id="doctorName"
          name="doctorName"
          value={patientDetail.doctorName}
          onChange={(e) =>
            setPatientDetail({
              ...patientDetail,
              doctorName: e.target.value,
            })
          }
          disabled
        />
        {validationErrors.doctorName && <p className="text-red-500">{validationErrors.doctorName}</p>}

        <button
          className="bg-blue-950 text-white px-4 py-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-300"
          onClick={() => setSeePrescription(!seePrescription)}
          type="button"
        >
          {seePrescription ? "Hide Prescription" : "Add Prescription"}
        </button>
      </div>

      {seePrescription && (
        <div className="flex flex-col gap-4 bg-[var(--six)] p-4 rounded-md mt-4">
          {/* Medication Input Fields */}
          <label htmlFor="drugName">Drug Name</label>
          <input
            className="border-2 bg-blue-100 rounded-md p-2"
            type="text"
            id="drugName"
            name="drugName"
            value={newMedication.DrugName}
            onChange={(e) =>
              setNewMedication({
                ...newMedication,
                DrugName: e.target.value,
              })
            }
          />

          <label htmlFor="dosage">Dosage</label>
          <input
            className="border-2 bg-blue-100 rounded-md p-2"
            type="text"
            id="dosage"
            name="dosage"
            value={newMedication.dosage}
            onChange={(e) =>
              setNewMedication({
                ...newMedication,
                dosage: e.target.value,
              })
            }
          />

          <label htmlFor="frequency">Frequency</label>
          <input
            className="border-2 bg-blue-100 rounded-md p-2"
            type="text"
            id="frequency"
            name="frequency"
            value={newMedication.frequency}
            onChange={(e) =>
              setNewMedication({
                ...newMedication,
                frequency: e.target.value,
              })
            }
          />

          <label htmlFor="duration">Duration</label>
          <input
            className="border-2 bg-blue-100 rounded-md p-2"
            type="text"
            id="duration"
            name="duration"
            value={newMedication.duration}
            onChange={(e) =>
              setNewMedication({
                ...newMedication,
                duration: e.target.value,
              })
            }
          />

          <label htmlFor="notes">Notes</label>
          <textarea
            className="border-2 bg-blue-100 rounded-md p-2"
            id="notes"
            name="notes"
            value={newMedication.notes}
            onChange={(e) =>
              setNewMedication({
                ...newMedication,
                notes: e.target.value,
              })
            }
          />

          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={handleAddMedication}
          >
            Add Medication
          </button>

          <button
            className="bg-[var(--twoP)] w-[50%] text-white px-4 py-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={CreatePrescription}
          >
            Create Prescription
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Creating_prescription;