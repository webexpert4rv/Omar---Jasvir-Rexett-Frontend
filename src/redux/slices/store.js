import { configureStore } from '@reduxjs/toolkit'
import authenticationDataSlice from '../slices/authenticationDataSlice'
import clientDataSlice from '../slices/clientDataSlice'


const combinedReducer = {
    authData: authenticationDataSlice,
    clientData:clientDataSlice

  }
  
  export default configureStore({
    reducer: combinedReducer
  })