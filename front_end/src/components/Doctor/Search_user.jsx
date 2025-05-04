import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_byPatient_name, delete__Prescription } from "@/store/prescription";
import folde from '../../assets/folder.png';
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner";

import { Search, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

const Search_user = () => {
  const dispatch = useDispatch();
  const prescriptions = useSelector((state) => state.prescriptions.prescriptions); // Access prescriptions correctly
  const [search, setSearch] = useState("");
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
  const [refreshData, setRefreshData] = useState(false); // State to trigger re-fetching
  const [isLoading, setIsLoading] = useState(true); // Add loading state


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
         dispatch(fetch_byPatient_name());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [dispatch, refreshData]); 
  // Handle search input
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter prescriptions based on search input
  const filteredPrescriptions = Array.isArray(prescriptions)
    ? prescriptions.filter((prescription) =>
        prescription.patientName.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  // Handle row click to toggle medication display
  const handleRowClick = (id) => {
    setSelectedPrescriptionId(selectedPrescriptionId === id ? null : id);
  };

 

  // Handle delete action
// Update handleDelete with error handling
const handleDelete = async (prescriptionId, event) => {
  event.stopPropagation();
  toast("Prescription is Deleted")

  try {
    const result = await dispatch(delete__Prescription(prescriptionId));
    if (result.error) throw new Error(result.error);
    setSelectedPrescriptionId(null);
    setRefreshData(prev => !prev);
  } catch (error) {
    console.error("Delete failed:", error);
    // Show error to user
    alert(`Delete failed: ${error.message}`);
  }
};

  return (
    <div className="p-4">
      <Toaster/>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search by patient name"
          className="flex-grow p-2 border rounded-2xl text-white"
        />
        <Search className="text-white w-10 h-10 bg-orange-400 p-2 rounded-[4px]" />
      </div>

      <h1 className="text-lg font-bold mt-4 text-white text-center">Patient Prescriptions</h1>
      <div className="flex flex-col space-y-4 mt-4">
        <Table className="text-white">
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Sex</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredPrescriptions.length > 0 ? (
              filteredPrescriptions.map((prescription) => (
                <TableRow
                  key={prescription._id}
                  onClick={() => handleRowClick(prescription._id)}
                  className="cursor-pointer hover:bg-gray-700"
                >
                  <TableCell>{prescription.patientName}</TableCell>
                  <TableCell>{prescription.age}</TableCell>
                  <TableCell>{prescription.sex}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <img src={folde} alt="No prescriptions" className="w-20 h-20 mx-auto" />
                  <p>No prescriptions found.</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {selectedPrescriptionId && (
          <div>
            <Table className="mt-8 bg-[var(--six)] text-black">
              <TableHeader>
                <TableRow>
                  <TableHead>Drug Name</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(filteredPrescriptions) &&
                  filteredPrescriptions
                    .find((prescription) => prescription._id === selectedPrescriptionId)
                    ?.medications.map((medication) => (
                      <TableRow key={medication._id}>
                        <TableCell>{medication.DrugName}</TableCell>
                        <TableCell>{medication.dosage}</TableCell>
                        <TableCell>{medication.frequency}</TableCell>
                        <TableCell>{medication.duration}</TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            <button
              onClick={(event) => handleDelete(selectedPrescriptionId, event)}
              className="block cursor-pointer px-4 py-2 text-red-600 hover:bg-gray-200 mt-1"
            >
              <Trash2 className="inline-block mr-2" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search_user;