import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

const initialState = {
  prescriptions: [],
  loading: false,
  error: null,
};

export const create__Prescription = createAsyncThunk(
  "/prescription/create_prescription",
  async (patientDetail, { rejectWithValue }) => {
    try {
      const response = await axios.post("/prescription/create_prescription", patientDetail, {
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
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

export const update__Prescription = createAsyncThunk(
  'prescription/update_prescription',
  async ({ PrescriptionId, prescription__Data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/prescription/update_prescription/${PrescriptionId}`, prescription__Data, {
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
      return PrescriptionId; // Return the PrescriptionId on success
    } catch (error) {
      // Handle errors and return a value for rejection
      return rejectWithValue(error.response?.data || { message: "Failed to delete prescription." });
    }
  }
);

export const fetch_byPatient_name = createAsyncThunk(
  'prescription/fetch_prescription_byPatient_name',
  async (patient_name, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/prescription/single_prescription/${patient_name}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch prescription by patient name." });
    }
  }
);

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
        state.loading = true;
      })
      .addCase(create__Prescription.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(create__Prescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(FetchAll__prescription.pending, (state) => {
        state.loading = true;
      })
      .addCase(FetchAll__prescription.fulfilled, (state, action) => {
        state.prescriptions = action.payload.prescriptions;
        console.log("Fetched prescriptions successfully");
        state.loading = false;
      })
      .addCase(FetchAll__prescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetch_byPatient_name.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetch_byPatient_name.fulfilled, (state, action) => {
        state.prescriptions = action.payload.prescriptions;
        console.log("Fetched prescriptions successfully");
        state.loading = false;
      })
      .addCase(fetch_byPatient_name.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(delete__Prescription.pending, (state) => {
        state.loading = true;
      })
      .addCase(delete__Prescription.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted prescription from the state
        state.prescriptions = state.prescriptions.filter(
          (prescription) => prescription._id !== action.payload
        );
      })
      .addCase(delete__Prescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setPrescriptions } = prescriptionSlice.actions;
export default prescriptionSlice.reducer;