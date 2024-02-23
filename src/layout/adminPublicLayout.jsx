import React, { useState } from 'react';
import { getToken } from '../helper/utlis';
import { Navigate } from 'react-router-dom';
const DeveloperPublicLayout = ({ children }) => {

    const token=getToken("adminToken")
    return (
        <>
            
        {!token?children:<Navigate to="/agency-dashboard"/>}
             
        </>
    );
};

export default DeveloperPublicLayout;