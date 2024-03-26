import React, { useState } from 'react';
import Sidebar from '../components/DeveloperSidebar';
import Navigation from '../components/DeveloperNavigation';
import { Navigate } from 'react-router-dom';
import { getToken } from '../helper/utlis';
const PublicLayout = ({ children }) => {

    const token=getToken("token")
    const role=localStorage.getItem("role")
    return (
        <>
              {role!=="client"? children :<Navigate to="/dashboard"/>}
        </>
    );
};

export default PublicLayout;