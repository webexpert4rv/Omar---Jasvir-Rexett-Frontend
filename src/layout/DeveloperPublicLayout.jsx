import React, { useState } from 'react';
import { getToken } from '../helper/utlis';
import { Navigate } from 'react-router-dom';
const DeveloperPublicLayout = ({ children }) => {

    const token=getToken("developerToken")
    return (
        <>
            
        {!token?children:<Navigate to="/developer-dashboard"/>}
             
        </>
    );
};

export default DeveloperPublicLayout;