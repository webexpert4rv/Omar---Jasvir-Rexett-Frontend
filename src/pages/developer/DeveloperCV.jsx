import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleDeveloper from "../../components/common/SingleDeveloper/SingleDeveloper";
import { fetchDeveloperCv } from "../../redux/slices/developerDataSlice";

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
