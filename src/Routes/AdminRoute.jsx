import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin';
import UseAuth from '../hooks/UseAuth';
import lodingImg from '../../public/loading.gif'
const AdminRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className='flex justify-center items-center h-screen'>
            <img src={lodingImg} alt="" />
        </div>
    }

    if (user && isAdmin) {
        return children;
    }


    return <Navigate to='/login' state={{ from: location }} replace></Navigate>


};

export default AdminRoute;