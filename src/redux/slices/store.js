import { configureStore } from '@reduxjs/toolkit'
import authenticationDataSlice from '../slices/authenticationDataSlice'
import clientDataSlice from '../slices/clientDataSlice'
import developerDataSlice from '../slices/developerDataSlice'
import adminDataSlice from "../slices/adminDataSlice"
import vendorDataSlice from '../slices/vendorDataSlice'


const combinedReducer = {
    authData: authenticationDataSlice,
    clientData:clientDataSlice,
    developerData:developerDataSlice,
    adminData:adminDataSlice,
    vendorData:vendorDataSlice,
  }
  
  export default configureStore({
    reducer: combinedReducer
  })