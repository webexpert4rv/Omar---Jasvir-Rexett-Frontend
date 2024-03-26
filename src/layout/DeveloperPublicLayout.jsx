import React, { useState } from 'react';
import { getToken } from '../helper/utlis';
import { Navigate } from 'react-router-dom';
const DeveloperPublicLayout = ({ children }) => {

    const role=localStorage.getItem("role")
    return (
        <>
        {role!=="developer"?children:<Navigate to="/developer-dashboard"/>}
             
        </>
    );
};

export default DeveloperPublicLayout;