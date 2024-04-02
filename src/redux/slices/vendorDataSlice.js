import { createSlice } from "@reduxjs/toolkit";
import vendorInstance from "../../services/vendor.instance";






const initialVendorData ={
    screenLoader : false,
    smallLoader : false,
    vendorDashboard : {},





}

export const vendorDataSlice = createSlice({
    name :  "vendorData",
    initialState :initialVendorData ,
    reducers : {
        setScreenLoader: (state, action) => {
            state.screenLoader = true;
        },
        setSmallLoader: (state, action) => {
            state.smallLoader = true;
        },
        setVendorDashboard: (state ,action) =>{
            state.vendorDashboard = action.payload
        }





    }
})
export const {setScreenLoader ,setSmallLoader ,setVendorDashboard}= vendorDataSlice.actions

export default vendorDataSlice.reducer

export  function getVendorDashboard(){
    return async (dispatch) => {
        try{
            let result = await vendorInstance.get("vendor/dashboard")
            console.log(result,"result")
            if(result.status==200){
                dispatch(setVendorDashboard(result.data.data))
            }

        }catch(error){

        }
    }}
        


