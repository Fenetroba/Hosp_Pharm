import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../lib/axios.js"; // Ensure the correct path to axios

const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null, // Added error state
};

// Registration Thunk
export const Registration = createAsyncThunk(
  "user/registration",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/register", userData, {
        withCredentials: true,
      });
      return response.data; // Return the successful response data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Registration failed." });
    }
  }
);

// Login Thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", loginData, {
        withCredentials: true,
      });
      return response.data; // Return user data
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Login failed." });
    }
  }
);

// Logout Thunk

export const  logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    const response = await axios.post("/auth/logout", {
      withCredentials: true,
    });
    return response.data;
  }
); 

// Check Authentication Thunk
export const CheckAuths = createAsyncThunk(
  "auth/user",
  async () => {
    const response = await axios.get("/auth/user", { withCredentials: true });
    return response.data; // Return user data if authenticated
  }
);



// Authentication Slice
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload; // Set user based on action payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Registration.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors
      })
      .addCase(Registration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null; // Set user from payload
        state.isAuthenticated = false; // Adjust based on your logic
        state.error = null; // Clear any previous error
      })
      .addCase(Registration.rejected, (state, action) => {
        state.loading = false;
        state.user = null; // Reset user on failure
        state.isAuthenticated = false;
        state.error = action.payload.message || "Signup failed"; // Capture error message
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null; // Ensure correct user data
        console.log("User data:", action.payload.user); // Debugging line
        state.isAuthenticated = true;
        state.error = null; // Clear any previous error
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null; // Reset user on failure
        state.isAuthenticated = false;
        state.error = action.payload.message || "Login failed"; // Capture error message
      })
      .addCase(CheckAuths.pending, (state) => {
        state.loading = true;
      })
      .addCase(CheckAuths.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false
        state.user = action.payload.user; // Set user from payload
        state.isAuthenticated = true; // User is authenticated
        state.error = null; // Clear any previous error
      })
      .addCase(CheckAuths.rejected, (state) => {
        state.loading = false; // Set loading to false
        state.user = null; // Reset user on failure
        state.isAuthenticated = false; // Reset authentication state
        state.error = "Authentication check failed"; // Capture error message
      });
  },
});

// Export actions
export const { SetUser } = authSlice.actions; 
export default authSlice.reducer; // Export reducer