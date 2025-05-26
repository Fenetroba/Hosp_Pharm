import { configureStore } from "@reduxjs/toolkit";
import userAuthSlice from "./useSlice.js";
import userSlice from './UserData__slice.js'
import prescriptions from './prescription.js'
import  Finance    from "./finance.js";
export const Store = configureStore({
  reducer: {
    Auth: userAuthSlice,
    user:userSlice,
    prescriptions:prescriptions,
    FIN:Finance


  },
});
