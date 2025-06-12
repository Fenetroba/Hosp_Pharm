import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../lib/axios.js"; // Ensure the correct path to axios

const initialState = {
  user:null,
  loading: false,
  isAuthenticated: false,
  
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

export const loginUser = createAsyncThunk(
  "/auth/login",

  async (loginData) => {
    const response = await axios.post(
      "/auth/login",
      loginData,
      {
        withCredentials: true,
      }
    );

    console.log(response.data)
    return response.data;
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
    const response = await axios.get("/auth/check-auth", {
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
        state.isAuthenticated=false;
        state.error = null;
      })
      .addCase(Registration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = null;
      })
      .addCase(Registration.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload.message || "Signup failed";
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated=false;
        state.user=null

      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = true;

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Logout failed";
      })
      .addCase(CheckAuths.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(CheckAuths.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
      })
      .addCase(CheckAuths.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload?.message || "Authentication check failed";
      });
  },
});

// Export actions
export const { SetUser, clearAuthState } = authSlice.actions;
export default authSlice.reducer;