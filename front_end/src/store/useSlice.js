import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../lib/axios.js"; // Ensure the correct path to axios

const initialState = {
  user: {
    name: null,
    email: null,
    role: null,
  },
  loading: false,
  isAuthenticated: false,
  error: null,
  userDetail: null,
};

// Helper function for error handling
const handleErrorResponse = (error) => {
  return error.response?.data || { message: "An error occurred." };
};

// Registration Thunk
export const Registration = createAsyncThunk(
  "user/registration",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/user/register", userData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
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
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

// Logout Thunk
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/logout", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleErrorResponse(error));
    }
  }
);

// Check Authentication Thunk
export const CheckAuths = createAsyncThunk(
  "/auth/user",
  async () => {
    const response = await axios.get("/auth/user", {
      withCredentials: true,
      headers: {
        "cache-control": "no-cache, no-store, must-revalidate, proxy-revalidate",
      },
    });
    return response.data; // Ensure you return the response data
  }
);

// Authentication Slice
export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Registration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Registration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(Registration.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload.message || "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;
        state.error = null;
        state.userDetail = action.payload.userDetail || null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload.message || "Login failed";
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
        state.userDetail = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Logout failed";
      })
      .addCase(CheckAuths.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      builder
    .addCase(CheckAuths.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user.email = action.payload.email;
      state.user.name = action.payload.name;
      state.user.role = action.payload.role; // Ensure this matches your API response
      state.userDetail = action.payload.userDetail; // Adjust based on your API response
    })
    .addCase(CheckAuths.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.userDetail = null;
      state.error = action.payload.message;
    });
  },
});

// Export actions
export const { SetUser, clearAuthState } = authSlice.actions;
export default authSlice.reducer;