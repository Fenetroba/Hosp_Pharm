import React, { useEffect, useState } from "react";
import { FetchAll__prescription } from "@/store/prescription";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const History = () => {
  const dispatch = useDispatch();
  const [openPrescriptionId, setOpenPrescriptionId] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Day"); // Default selection
  const [isLoading, setIsLoading] = useState(true);

  // Access prescriptions from the Redux store
  const prescriptions = useSelector((state) => state.prescriptions.prescriptions);
  console.log(prescriptions);

  const fetchData = async () => { // Make fetchData async
    setIsLoading(true);
    await dispatch(FetchAll__prescription()); // Dispatch and wait for the data
    setIsLoading(false);
  };
  useEffect(() => {

    fetchData();
  }, [dispatch]);

  // Subscribe to changes in the prescriptions array
  useEffect(() => {
    fetchData(); // Re-fetch data when prescriptions change
  }, [prescriptions]);

  const handleRowClick = (id) => {
    setOpenPrescriptionId(openPrescriptionId === id ? null : id);
  };

  return (
    <div className="p-4">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="w-full md:w-auto p-2 bg-blue-100 rounded-md"
        >
          <option value="Day">Day</option>
          <option value="Week">Week</option>
          <option value="Month">Month</option>
        </select>
        <h1 className="text-[var(--six)] text-lg font-semibold mt-2 md:mt-0">History</h1>
      </div>

      <Table className="text-amber-50 m-2 md:m-8">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Patient No</TableHead>
            <TableHead>Sex</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : Array.isArray(prescriptions) && prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <TableRow
                key={prescription._id}
                onClick={() => handleRowClick(prescription._id)}
                className="cursor-pointer hover:bg-gray-700"
              >
                <TableCell className="font-medium">{prescription.patientName}</TableCell>
                <TableCell>{prescription.address}</TableCell>
                <TableCell>{prescription.age}</TableCell>
                <TableCell>{new Date(prescription.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{prescription.patientNo}</TableCell>
                <TableCell>{prescription.sex}</TableCell>
                <TableCell
                  className={`${
                    prescription.status === "Completed"
                      ? "bg-green-500 rounded-2xl text-black"
                      : prescription.status === "Cancelled"
                      ? "text-red-500 rounded-2xl"
                      : "text-yellow-500 rounded-2xl"
                  }`}
                >
                  {prescription.status}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No prescriptions found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {openPrescriptionId && (
        <div className="mt-4">
          <Table className="bg-[var(--six)] text-black">
            <TableHeader>
              <TableRow>
                <TableHead>Drug Name</TableHead>
                <TableHead>Dosage</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(prescriptions) &&
                prescriptions
                  .find((prescription) => prescription._id === openPrescriptionId)
                  ?.medications.map((medication) => (
                    <TableRow key={medication._id}>
                      <TableCell>{medication.DrugName}</TableCell>
                      <TableCell>{medication.dosage}</TableCell>
                      <TableCell>{medication.frequency}</TableCell>
                      <TableCell>{medication.duration}</TableCell>
                      <TableCell>{medication.notes}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default History;