import React, { useEffect } from "react";
import { FetchAll__prescription } from "@/store/prescription";
import { useDispatch, useSelector } from "react-redux";

const History = () => {
  const dispatch = useDispatch();
  
  // Access prescriptions from the Redux store
  const { prescriptions } = useSelector((state) => state.prescriptions);
  
  // Fetch all prescriptions when the component mounts
  useEffect(() => {
    dispatch(FetchAll__prescription());
  }, [dispatch]);

  return (
    <div>
      <div className="flex items-center space-x-20">
        <select value="" className="w-[50%] mt-2.5 ml-3 p-2 bg-blue-100">
          <option>Day</option>
          <option>Week</option>
          <option>Month</option>
        </select>

        <h1 className="text-[var(--six)]">History</h1>
      </div>

      <div>
      
      {prescriptions && prescriptions.length > 0 ? (
        <table className="min-w-full bg-gray-800 text-white text-[14px] mt-4">
          <thead>
            <tr className="border-2">
              <th className="py-2">Doctor</th>
              <th className="py-2">Drug Name</th>
              <th className="py-2">Dosage</th>
              <th className="py-2">Frequency</th>
              <th className="py-2">Duration</th>
            </tr>
          </thead>
          <tbody className="border-2">
            {prescriptions.map((prescription, index) => (
              prescription.medications.map((medication) => (
                <tr key={`${prescription._id}-${medication._id}`}>
                  {index === 0 && (
                    <td rowSpan={prescription.medications.length} className="py-2">
                      {prescription.doctorName}
                    </td>
                  )}
                  <td className="py-2 border-2">{medication.DrugName}</td>
                  <td className="py-2 border-2">{medication.dosage}</td>
                  <td className="py-2 border-2">{medication.frequency}</td>
                  <td className="py-2 border-2">{medication.duration}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      ) : (
        <p>No prescriptions available.</p>
      )}
      </div>
    </div>
  );
};

export default History;