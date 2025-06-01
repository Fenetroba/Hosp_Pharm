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
import { FetchAll__prescription, update__Prescription } from "@/store/prescription";
import { Minus, Plus, Subscript } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

const Display_History = ({ searchQuery }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const dispatch = useDispatch();
  const [openPrescriptionId, setOpenPrescriptionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);

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

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(
        (prescription) =>
          prescription.patientName?.toLowerCase().includes(query) ||
          prescription.doctorName?.toLowerCase().includes(query) ||
          prescription.patientNo?.toString().includes(query)
      );
    }

    // Apply status filter
    if (selectedStatus) {
      filteredData = filteredData.filter(
        (prescription) => prescription.status === selectedStatus
      );
    }

    // Apply gender filter
    if (selectedSex) {
      filteredData = filteredData.filter(
        (prescription) => prescription.sex === selectedSex
      );
    }

    // Apply date filter
    if (selectedDate) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      filteredData = filteredData.filter((prescription) => {
        const prescriptionDate = new Date(prescription.createdAt);
        
        switch (selectedDate) {
          case 'today':
            return prescriptionDate >= today;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return prescriptionDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return prescriptionDate >= monthAgo;
          default:
            return true;
        }
      });
    }

    setFilteredPrescriptions(filteredData);
  }, [prescriptions, selectedStatus, selectedSex, selectedDate, searchQuery]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleRowClick = (id) => {
    setOpenPrescriptionId(openPrescriptionId === id ? null : id);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSexChange = (e) => {
    setSelectedSex(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleStatusUpdate = async (prescriptionId, newStatus) => {
    try {
      // Update the prescription status in the database
      const result = await dispatch(update__Prescription({
        PrescriptionId: prescriptionId,
        prescription__Data: { status: newStatus }
      })).unwrap();

      // Show success toast
      toast.success(`Status updated to ${newStatus}`, {
        description: "The prescription status has been updated successfully.",
      });
      
      // Refresh the prescriptions list
      dispatch(FetchAll__prescription());
      
      // Close the status update UI
      setSelectedPrescriptionId(null);
    } catch (error) {
      // Show error toast
      toast.error("Failed to update status", {
        description: error.message || "There was an error updating the prescription status.",
      });
    }
  };

  const [dispalyEdit, setDisplayEdit] = useState(false);
  const [dispalyupdate, setDisplayUpdate] = useState(false);

  return (
    <div className="m-5 shadow-green-900 shadow-md p-3.5 rounded-2xl mb-7">

      <Toaster />
      <div className="flex gap-4 mb-4">
        <select 
          onChange={handleDateChange} 
          value={selectedDate}
          className="px-5 cursor-pointer py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
        </select>

        {dispalyupdate && (
          <RadioGroup
            defaultValue="option-one"
            className="relative right-0 bg-green-950 p-3 rounded-2xl text-white"
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
              <RadioGroupItem value="option-three" id="option-three" />
              <Label htmlFor="option-three">Reject</Label>
            </div>
          </RadioGroup>
        )}
      </div>

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
                      : prescription.status === "rejecting"
                      ? "bg-red-500 rounded-2xl"
                      : "bg-yellow-500 rounded-2xl"
                  } flex space-x-1.5 justify-between w-[90%]`}
                >
                  <span>{prescription.status}</span>
                  <span
                    className="rounded-full hover:bg-amber-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPrescriptionId(prescription._id);
                    }}
                  >
                    <Plus />
                  </span>
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
             
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
};

export default Display_History;
