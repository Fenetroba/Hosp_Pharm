import React, { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDispatch, useSelector } from "react-redux";
import { FetchAll__prescription } from "@/store/prescription";
import { Minus, Plus, Subscript } from "lucide-react";

const Display_History = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const dispatch = useDispatch();
  const [openPrescriptionId, setOpenPrescriptionId] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Day"); // Default selection
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);

  // Access prescriptions from the Redux store
  const prescriptions = useSelector(
    (state) => state.prescriptions.prescriptions
  );

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
       dispatch(FetchAll__prescription());
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  // Function to apply filters
  const applyFilters = useCallback(() => {
    let filteredData = [...prescriptions];

    if (selectedStatus) {
      filteredData = filteredData.filter(
        (prescription) => prescription.status === selectedStatus
      );
    }

    if (selectedSex) {
      filteredData = filteredData.filter(
        (prescription) => prescription.sex === selectedSex
      );
    }

    // Implement period filtering (Day, Week, Month) here if needed.
    // This will require date calculations based on prescription.createdAt.

    setFilteredPrescriptions(filteredData);
  }, [prescriptions, selectedStatus, selectedSex, selectedPeriod]);

  useEffect(() => {
    applyFilters();
  }, [
    prescriptions,
    selectedStatus,
    selectedSex,
    selectedPeriod,
    applyFilters,
  ]);

  const handleRowClick = (id) => {
    setOpenPrescriptionId(openPrescriptionId === id ? null : id);
  };

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSexChange = (e) => {
    setSelectedSex(e.target.value);
  };

  const [dispalyEdit, setDisplayEdit] = useState(false);
  const [dispalyupdate, setDisplayUpdate] = useState(false);

  return (
    <div className="m-5 shadow-green-900 shadow-md p-3.5 rounded-2xl mb-7">
<<<<<<< HEAD
      <Toaster />
      <div className="flex gap-4 mb-4">
        <select 
          onChange={handleDateChange} 
          value={selectedDate}
          className="px-5 cursor-pointer py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
=======
      {dispalyupdate && (
        <RadioGroup
          defaultValue="option-one"
          className="relative right-0 bg-green-950 p-3 rounded-2xl text-white"
>>>>>>> 4f996045518191b26d780759fa29621d44ff7037
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-one" id="option-one" />
            <Label htmlFor="option-one">CONFIRM</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-two" id="option-two" />
            <Label htmlFor="option-two">Pending</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-three" id="option-two" />
            <Label htmlFor="option-two">Rejecting</Label>
          </div>
        </RadioGroup>
      )}
      <Table className="text-black m-2 md:m-8">
        <TableHeader>
          <TableRow>
            <TableHead>Doctors Name</TableHead>
            <TableHead>Patient Name</TableHead>
            <TableHead>Created Date</TableHead>
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
            filteredPrescriptions.map((prescription) => (
              <TableRow
                key={prescription._id}
                onClick={() => handleRowClick(prescription._id)}
                className="cursor-pointer hover:bg-green-100"
              >
                <TableCell className="font-medium">
                  {prescription.doctorName}
                </TableCell>
                <TableCell className="font-medium">
                  {prescription.patientName}
                </TableCell>

                <TableCell>
                  {new Date(prescription.createdAt).toLocaleString(undefined, {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  })}
                </TableCell>
                <TableCell>{prescription.patientNo}</TableCell>
                <TableCell>{prescription.sex}</TableCell>
                <TableCell
                  className={`${
                    prescription.status === "Completed"
                      ? "bg-green-500 rounded-2xl text-black"
                      : prescription.status === "Cancelled"
                      ? "text-red-500 rounded-2xl"
                      : "text-yellow-500 rounded-2xl"
                  } flex space-x-1.5`}
                >
                  <span> {prescription.status}</span>
                  <span
                    className="rounded-full hover:bg-amber-100"
                    onClick={(e) => setDisplayUpdate(!dispalyupdate)}
                  >
                    <Plus />
                  </span>
                  <div></div>
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
          <Table className="bg-[var(--fiveP)] text-black">
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
                  .find(
                    (prescription) => prescription._id === openPrescriptionId
                  )
                  ?.medications.map((medication) => (
                    <TableRow key={medication._id}>
                      <TableCell>{medication.DrugName}</TableCell>
                      <TableCell>{medication.dosage}</TableCell>
                      <TableCell>{medication.frequency}</TableCell>
                      <TableCell>{medication.duration}</TableCell>
                      <TableCell>{medication.notes}</TableCell>
                    </TableRow>
                  ))}
              <TableCell
                className="bg-amber-500 z-40 relative flex justify-between my-3 ml-2 cursor-pointer"
                onClick={(e) => {
                  setDisplayEdit(!dispalyEdit);
                }}
              >
                EDIT
                {dispalyEdit ? (
                  <div>
                    <Minus /> <h1>hi</h1>
                  </div>
                ) : (
                  <Plus className="hover:bg-amber-100" />
                )}
              </TableCell>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Display_History;
