import { configureStore } from '@reduxjs/toolkit'
import authenticationDataSlice from '../slices/authenticationDataSlice'
import clientDataSlice from '../slices/clientDataSlice'
import developerDataSlice from '../slices/developerDataSlice'


const combinedReducer = {
    authData: authenticationDataSlice,
    clientData:clientDataSlice,
    developerData:developerDataSlice

  }
  
  export default configureStore({
    reducer: combinedReducer
  })