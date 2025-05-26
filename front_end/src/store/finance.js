import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

const initialState = {
     Finance: [],
  loading: false,
  error: null,
  message: null,
  dailyStats: {
    totalSales: 0,
    totalTransactions: 0,
    drugsSold: 0,
    profit: 0
  }
};
export const create__finance = createAsyncThunk(
     "/payment/finance",
     async (financeDetail, { rejectWithValue }) => {
       try {
         const response = await axios.post("/payment/finance", financeDetail, {
           withCredentials: true,
         });
         console.log(response);
         return response.data;
       } catch (error) {
         return rejectWithValue(handleErrorResponse(error));
       }
     }
   );

export const fetchDailyFinance = createAsyncThunk(
  "finance/fetchDaily",
  async (date, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/payment/finance/daily/${date}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch daily finance");
    }
  }
);

const  CreateFinance=createSlice({
     name: "FIN",
     initialState,
   
     reducers: {
       setFinance: (state, action) => {
         state.FIN = action.payload;
       },
     },
     extraReducers: (builder) => {
          builder
            .addCase(create__finance.pending, (state, action) => {
              state.loading = true;
              state.Finance = null;
            })
            .addCase(create__finance.fulfilled, (state, action) => {
              state.loading = false;
              state.Finance = action.payload.user || null;
              state.message = action.payload.message || null;
              console.log(state.message);

            })
            .addCase(create__finance.rejected, (state, action) => {
              state.loading = false;
              state.Finance = null;
              state.error = action.payload.error || null;
              console.log(state.error);

          
            })
            .addCase(fetchDailyFinance.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchDailyFinance.fulfilled, (state, action) => {
              state.loading = false;
              state.dailyStats = action.payload.stats;
              state.Finance = action.payload.transactions;
            })
            .addCase(fetchDailyFinance.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
          }

})
export const { setFinance } = CreateFinance.actions;
export default CreateFinance.reducer;