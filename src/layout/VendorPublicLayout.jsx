import React, { useState } from 'react';
import { getToken } from '../helper/utlis';
import { Navigate } from 'react-router-dom';
const VendorPublicLayout = ({ children }) => {

    const role=localStorage.getItem("role")
    return (
        <>
        {role!=="vendor"?children:<Navigate to="/vendor-dashboard"/>}
             
        </>
    );
};

export default VendorPublicLayout;