import React, { useState } from 'react';
import Sidebar from '../components/DeveloperSidebar';
import Navigation from '../components/DeveloperNavigation';
import { Navigate } from 'react-router-dom';
import { getToken } from '../helper/utlis';
const PublicLayout = ({ children }) => {

    const token=getToken("token")
    return (
        <>
              {!token? children :<Navigate to="/dashboard"/>}
        </>
    );
};

export default PublicLayout;