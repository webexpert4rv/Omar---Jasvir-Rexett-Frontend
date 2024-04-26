import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleDeveloper from "../../components/common/SingleDeveloper/SingleDeveloper";
import { getDeveloperDetails } from "../../redux/slices/clientDataSlice";
import { useLocation } from "react-router-dom";


const ClientSingleDeveloper = () => {
    const dispatch = useDispatch()
    const {developerDetails} = useSelector(state=> state.clientData)


    const location = useLocation();
    let devId = location.pathname.split("/")[2]

    useEffect(()=>{
        dispatch(getDeveloperDetails(devId))

    },[])
    return(<>
    <SingleDeveloper  data={developerDetails} role={"client"}/>
    </>
    )
}
export default ClientSingleDeveloper;
