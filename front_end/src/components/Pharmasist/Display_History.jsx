import React, { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Minus, Plus, CheckCircle2, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";

const Display_History = ({ searchQuery }) => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const dispatch = useDispatch();
  const [openPrescriptionId, setOpenPrescriptionId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");

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

  const openStatusModal = (prescriptionId, currentStatus) => {
    setSelectedPrescriptionId(prescriptionId);
    setNewStatus(currentStatus);
    setIsStatusModalOpen(true);
  };

  const handleStatusUpdate = async () => {
    try {
      const result = await dispatch(update__Prescription({
        PrescriptionId: selectedPrescriptionId,
        prescription__Data: { status: newStatus }
      })).unwrap();

      toast.success(`Status updated to ${newStatus}`, {
        description: "The prescription status has been updated successfully.",
      });
      
      dispatch(FetchAll__prescription());
      setIsStatusModalOpen(false);
      setSelectedPrescriptionId(null);
    } catch (error) {
      toast.error("Failed to update status", {
        description: error.message || "There was an error updating the prescription status.",
      });
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="m-5 shadow-green-900 shadow-md p-3.5 rounded-2xl mb-7">
      <Toaster />
      <div className="flex gap-4 mb-4">
        <select 
          onChange={handleDateChange} 
          value={selectedDate}
          className="px-5 cursor-pointer py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>

        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="px-5 cursor-pointer py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={selectedSex}
          onChange={handleSexChange}
          className="px-5 cursor-pointer py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
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
                <TableCell>
                  <div
                    className={`flex items-center justify-between px-3 py-1 rounded-full ${
                      prescription.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : prescription.status === "Rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(prescription.status)}
                      <span>{prescription.status}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openStatusModal(prescription._id, prescription.status);
                      }}
                      className="p-1 hover:bg-white rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
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

      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Update Prescription Status</DialogTitle>
          </DialogHeader>
          <div className="py-4 t">
            <RadioGroup
              value={newStatus}
              onValueChange={setNewStatus}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Completed" id="completed" className="w-6 h-6 cursor-pointer" />
                <Label htmlFor="completed" className="flex items-center gap-2">
               <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-[20px]">Completed</span>
               </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Pending" id="pending" className="w-6 h-6 cursor-pointer" />
                <Label htmlFor="pending" className="flex items-center gap-2">
               <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-[20px]">Pending</span>
               </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Rejected" id="rejected" className="w-6 h-6 cursor-pointer" />
                <Label htmlFor="rejected" className="flex items-center gap-2">
               <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-[20px]">Rejected</span>
               </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
          <DialogFooter>
            <Button variant="outline" className="bg-red-500 hover:bg-red-600 text-white font-bold cursor-pointer" onClick={() => setIsStatusModalOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white font-bold cursor-pointer"  onClick={handleStatusUpdate}>Update Status</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Display_History;
