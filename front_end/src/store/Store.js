import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./useSlice.js";
import userSlice from './UserData__slice.js'
import prescriptions from './prescription.js'
export const Store = configureStore({
  reducer: {
    Auth: userAuthSlice,
    user:userSlice,
    prescriptions:prescriptions


  },
});
