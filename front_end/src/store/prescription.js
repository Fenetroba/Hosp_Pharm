import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
const initialState= {
     prescriptions: [],
     loading: false,
     error: null,
 }
 export const create__Prescription = createAsyncThunk(
     "/prescription/createPrescription",
     async () => {
       const response = await axios.post("/create_prescription",prescriptionData, {
         withCredentials: true,
         headers: {
           "cache-control": "no-cache, no-store, must-revalidate, proxy-revalidate",
         },
       });
       return response.data; // Ensure you return the response data
     }
   );

   export const FetchAll__prescription = createAsyncThunk(
     'prescription/get_all_priscription',
     async (_, { rejectWithValue }) => {
       try {
         // Use GET request to fetch all users
         const response = await axios.get('/prescription/all_prescription', {
           withCredentials: true,
         });
         return response.data; // Return user data
       } catch (error) {
         return rejectWithValue(error.response?.data || { message: 'Fetch failed.' });
       }
     }
   );


   export const Update__prescription= createAsyncThunk(
     'prescription/update_prescription',
     async ({ PrescriptionId, prescription__Data }, { rejectWithValue }) => {
       try {
         const response = await axios.patch(`/prescription/update_prescription/${PrescriptionId}`,prescription__Data, {
           withCredentials: true, // Include credentials if needed
         });
         return response.data; // Return the response data on success
       } catch (error) {
         // Handle errors and return a value for rejection
         return rejectWithValue(error.response?.data || { message: "Failed to update prescription data." });
       }
     }
   );

   export const Delete__prescription = createAsyncThunk(
     'prescription/delete_prescription',
     async (PrescriptionId, { rejectWithValue }) => {
       try {
         const response = await axios.delete(`/prescription/delete_prescription/${PrescriptionId}`, {
           withCredentials: true, // Include credentials if needed
         });
         return response.data; // Return the response data on success
       } catch (error) {
         // Handle errors and return a value for rejection
         return rejectWithValue(error.response?.data || { message: "Failed to delete prescription." });
       }
     }
   );
 export const fetch_prescription_byPatient_name=createAsyncThunk(
    'prescription/fetch_prescription_byPatient_name',
    async (patient_name, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/prescription/fetch_byPatient_name/${patient_name}`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Failed to fetch prescription by patient name." });
        }
    }
 )
const prescriptionSlice = createSlice({
    name: "prescription",
    initialState,

   

    reducers: {
        setPrescriptions: (state, action) => {
            state.prescriptions = action.payload;
        },
    },


    extraReducers: (builder) => {
        builder.addCase(fetchPrescriptions.pending, (state) => {
            state.loading = true;
        });
    },
});

export const { setPrescriptions } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
