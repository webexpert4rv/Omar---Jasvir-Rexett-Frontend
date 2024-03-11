import React, { useEffect, useState } from "react";
import RexettDocuments from "../../components/common/Documents/RexettDocuments";
import { getFolderData } from "../../redux/slices/clientDataSlice";
import { useDispatch } from "react-redux";

const DeveloperDocuments = () => {
    const dispatch =useDispatch();

    // useEffect(()=>{
    //     dispatch(getFolderData("0"))
    // },[dispatch])

    return (
        <>
         <RexettDocuments currentRole="developer"/>
        </>
    );
};

export default DeveloperDocuments;
