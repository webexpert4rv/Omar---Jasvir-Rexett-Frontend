import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleDeveloper from "../../components/common/SingleDeveloper/SingleDeveloper";
import { fetchDeveloperCv } from "../../redux/slices/developerDataSlice";
<<<<<<< HEAD
import DeveloperDetails from "./Modals/DeveloperDetails";
import ScreenLoader from "../../components/atomic/ScreenLoader";
import { HiDownload } from "react-icons/hi";

=======
>>>>>>> 0eaab4e61f74dde94ccea768db9464b94852b453

const DeveloperCV = () => {
    const { developerCvData } = useSelector(state => state.developerData)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDeveloperCv())
    }, [dispatch])

    
     return (
        <>
            <SingleDeveloper data={developerCvData} role={"developer"}/>
        </>
    )
}
export default DeveloperCV;
