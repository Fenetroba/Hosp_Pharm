import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_byPatient_name } from "@/store/prescription";
import folde from '../../assets/folder.png';
import { Search } from "lucide-react";
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
  const { prescriptions } = useSelector((state) => state.prescriptions);
  const [search, setSearch] = useState("");
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);

  useEffect(() => {
    dispatch(fetch_byPatient_name()); // Fetch prescriptions when the component mounts
  }, [dispatch]);

  // Handle search input
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter prescriptions based on search input
  const filteredPrescriptions = prescriptions.filter((prescription) =>
    prescription.patientName.toLowerCase().includes(search.toLowerCase())
  );

  // Handle row click to toggle medication display
  const handleRowClick = (id) => {
    setSelectedPrescriptionId(selectedPrescriptionId === id ? null : id);
  };

  return (
    <div>
      <div className="p-2 flex items-center space-x-1.5">
        <input
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search by patient name"
          className="bg-white border-0 outline-0 shadow-2xl rounded-2xl"
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
            {filteredPrescriptions.length > 0 ? (
              filteredPrescriptions.map((prescription) => (
                <TableRow key={prescription._id} onClick={() => handleRowClick(prescription._id)} className="cursor-pointer hover:bg-gray-700">
                  <TableCell>{prescription.patientName}</TableCell>
                  <TableCell>{prescription.age}</TableCell>
                  <TableCell>{prescription.sex}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                 <img src={folde} alt="folder" className="w-30 h-30 ml-[60%]" />
              </TableRow>
            )}
          </TableBody>
        </Table>
      

        {selectedPrescriptionId && (
          
 

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
              {filteredPrescriptions
                .find(prescription => prescription._id === selectedPrescriptionId)
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
                 )}
      </div>
    </div>
  );
};

export default Search_user;