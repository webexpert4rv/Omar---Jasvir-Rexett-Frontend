import React, { useState } from 'react';
import { getToken } from '../helper/utlis';
import { Navigate } from 'react-router-dom';
const AdminPublicLayout = ({ children }) => {

    const role=localStorage.getItem("role")
    return (
        <>
            
        {role!=="admin"?children:<Navigate to="/admin-dashboard"/>}
             
        </>
    );
};

export default AdminPublicLayout;