import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios"; // Adjust the path as necessary

const initialState= {
     searchResults: [], // Initialize search results
     UsersList:[],
     loading:false
   }

   export const SearchUser = createAsyncThunk(
     "user/get_single_user",
     async (name, { rejectWithValue }) => {
       try {
         // Use GET request with query parameter
         const response = await axios.get(`/user/get_singl_user`, {
           params: { name }, // Send name as a query parameter
           withCredentials: true,
         });
         return response.data; // Return user data
       } catch (error) {
         return rejectWithValue(error.response?.data || { message: "Search failed." });
       }
     }
   )
   export const FetchAllUsers = createAsyncThunk(
    'user/all_users',
    async (_, { rejectWithValue }) => {
      try {
        // Use GET request to fetch all users
        const response = await axios.get('/user/all_users', {
          withCredentials: true,
        });
        return response.data; // Return user data
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: 'Fetch failed.' });
      }
    }
  );
  export const UpdateUser = createAsyncThunk(
    'user/updateUser',
    async ({ userId, userData }, { rejectWithValue }) => {
      try {
        const response = await axios.patch(`/user/update_user/${userId}`, userData, {
          withCredentials: true, // Include credentials if needed
        });
        return response.data; // Return the response data on success
      } catch (error) {
        // Handle errors and return a value for rejection
        return rejectWithValue(error.response?.data || { message: "Failed to update user." });
      }
    }
  );
  export const DeleteUser = createAsyncThunk(
    'user/deleteUser',
    async (userId, { rejectWithValue }) => {
      try {
        const response = await axios.delete(`/user/delete_user/${userId}`, {
          withCredentials: true, // Include credentials if needed
        });
        return response.data; // Return the response data on success
      } catch (error) {
        // Handle errors and return a value for rejection
        return rejectWithValue(error.response?.data || { message: "Failed to delete user." });
      }
    }
  );

// User slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
     SetUserData: (state, action) => {
          state.searchResults = action.payload; // Set user based on action payload
        },
  },
  extraReducers: (builder) => {
    builder
    .addCase(SearchUser.pending, (state, action) => {
     state.searchResults = []; // Clear results on failure
     state.loading=true
   })
      .addCase(SearchUser.fulfilled, (state, action) => {
        state.searchResults = action.payload; // Update state with search results
        state.loading=false
      })
      
      .addCase(SearchUser.rejected, (state, action) => {
        state.searchResults = []; // Clear results on failure
        state.loading=false
      })
    .addCase(FetchAllUsers.pending, (state, action) => {
     state.UsersList = []; // Clear results on failure
     state.loading=true
   })
      .addCase(FetchAllUsers.fulfilled, (state, action) => {
        state.UsersList = action.payload; // Update state with search results
        state.loading=false
      })
      
      .addCase(FetchAllUsers.rejected, (state, action) => {
        state.UsersList = []; // Clear results on failure
        state.loading=false
      })
      .addCase(UpdateUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Store error message
      });
  },
});

// Export the reducer
export default userSlice.reducer;
export const { SetUserData } = userSlice.actions; 