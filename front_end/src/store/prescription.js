import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
const initialState= {
     prescriptions: [],
     loading: false,
     error: null,
 }

 
 export const create__Prescription = createAsyncThunk(
   "/prescription/create_prescription",
   async (patientDetail) => {
     try {
       const response = await axios.post("/prescription/create_prescription", patientDetail, {
         withCredentials: true,
         headers: {
           "Cache-Control": "no-cache, no-store, must-revalidate, proxy-revalidate",
         },
       });
       return response.data; // Ensure you return the response data
     } catch (error) {
       throw new Error("Failed to create prescription: " + error.message);
     }
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

   export const update__Prescription= createAsyncThunk(
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

   export const delete__Prescription = createAsyncThunk(
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
 export const fetch_byPatient_name=createAsyncThunk(
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
    name: "prescriptions",
    initialState,

   

    reducers: {
        setPrescriptions: (state, action) => {
            state.prescriptions = action.payload;
        },
    },


    extraReducers: (builder) => {
      builder
      .addCase(create__Prescription.pending, (state, action) => {
       state.prescriptions = []; // Clear results on failure
       state.loading=true
     })
      .addCase(create__Prescription.fulfilled, (state, action) => {
       state.prescriptions=action.payload
       console.log("created")
       state.loading=false
     })
      .addCase(create__Prescription.rejected, (state, action) => {
       state.prescriptions = []; // Clear results on failure
       state.loading=false
     })
     .addCase(FetchAll__prescription.pending, (state) => {
      state.loading = true; // Set loading to true
      state.prescriptions = []; // Clear results when the request is pending
    })
    .addCase(FetchAll__prescription.fulfilled, (state, action) => {
      state.prescriptions = action.payload.prescriptions; // Set prescriptions to the payload
      console.log("Fetched prescriptions successfully");
      state.loading = false; // Set loading to false on successful fetch
    })
    .addCase(FetchAll__prescription.rejected, (state) => {
      state.prescriptions = []; // Clear results on failure
      console.error("Failed to fetch prescriptions"); // Log the error
      state.loading = false; // Set loading to false on failure
    })
     .addCase(fetch_byPatient_name.pending, (state) => {
      state.loading = true; // Set loading to true
      state.prescriptions = []; // Clear results when the request is pending
    })
    .addCase(fetch_byPatient_name.fulfilled, (state, action) => {
      state.prescriptions = action.payload.prescriptions; // Set prescriptions to the payload
      console.log("Fetched prescriptions successfully");
      state.loading = false; // Set loading to false on successful fetch
    })
    .addCase(fetch_byPatient_name.rejected, (state) => {
      state.prescriptions = []; // Clear results on failure
      console.error("Failed to fetch prescriptions"); // Log the error
      state.loading = false; // Set loading to false on failure
    })
    }
  })


export const { setPrescriptions } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;
