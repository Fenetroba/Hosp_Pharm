import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { create__Prescription } from "@/store/prescription"; // Ensure this import exists
import CRUD_Functions from './CRUD_Functions'; // Import the CRUD_Functions component

const Creating_prescription = () => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(false);
  const [patientDetail, setPatientDetail] = useState({
    patientName: "",
    address: "",
    age: 0,
    sex: "Male",
    patientNo: "",
    drugName: "",
    dosage: "",
    frequency: "",
    duration: "",
  });

  const CreatePrescription = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(create__Prescription(patientDetail));
    console.log(patientDetail);
    // Reset patient details after creating prescription
    setPatientDetail({
      patientName: "",
      address: "",
      age: 0,
      sex: "Male",
      patientNo: "",
      drugName: "",
      dosage: "",
      frequency: "",
      duration: "",
    });
  };

  const [seePrescription, setSeePrescription] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.9 }}
      className="relative  bg-[var(--one)] flex flex-col space-y-4 p-5"
    >
      <CRUD_Functions /> {/* Add the CRUD_Functions component here */}

      <div className="flex flex-col gap-4 bg-[var(--six)] p-4 rounded-md">
        <label htmlFor="patientName">Patient Name</label>
        <input
          className="border-2 bg-blue-100 rounded-md p-2"
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

        <label htmlFor="address">Address</label>
        <input
          className="border-2 bg-blue-100 rounded-md p-2"
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

        <label htmlFor="age">Age</label>
        <input
          className="border-2 bg-blue-100 rounded-md p-2"
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
          className="border-2 bg-blue-100 rounded-md p-2"
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
        <button
          className="bg-blue-950 text-white px-4 py-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-300"
          onClick={() => setSeePrescription(!seePrescription)}
          type="button"
        >
          Add Prescription
        </button>
      </div>

      {seePrescription && (
        <div className="flex flex-col gap-4 bg-[var(--six)] p-4 rounded-md mt-4">
          <label htmlFor="drugName">Drug Name</label>
          <input
            className="border-2 bg-blue-100 rounded-md p-2"
            type="text"
            id="drugName"
            name="drugName"
            value={patientDetail.drugName}
            onChange={(e) =>
              setPatientDetail({
                ...patientDetail,
                drugName: e.target.value,
              })
            }
          />
          <label htmlFor="dosage">Dosage</label>
          <input
            className="border-2 bg-blue-100 rounded-md p-2"
            type="text"
            id="dosage"
            name="dosage"
            value={patientDetail.dosage}
            onChange={(e) =>
              setPatientDetail({
                ...patientDetail,
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
            value={patientDetail.frequency}
            onChange={(e) =>
              setPatientDetail({
                ...patientDetail,
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
            value={patientDetail.duration}
            onChange={(e) =>
              setPatientDetail({
                ...patientDetail,
                duration: e.target.value,
              })
            }
          />

          <button
            className="bg-[var(--twoP)] text-white px-4 py-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-300"
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