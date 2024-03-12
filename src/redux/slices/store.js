import { configureStore } from '@reduxjs/toolkit'
import authenticationDataSlice from '../slices/authenticationDataSlice'
import clientDataSlice from '../slices/clientDataSlice'
import developerDataSlice from '../slices/developerDataSlice'
import adminDataSlice from "../slices/adminDataSlice"


const combinedReducer = {
    authData: authenticationDataSlice,
    clientData:clientDataSlice,
    developerData:developerDataSlice,
    adminData:adminDataSlice
  }
  
  export default configureStore({
    reducer: combinedReducer
  })