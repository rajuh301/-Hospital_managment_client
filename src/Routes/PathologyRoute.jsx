import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../hooks/UseAuth';
import lodingImg from '../../public/loading.gif'
import usePathology from '../hooks/usePhotology';
const PathologyRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const [isPathology, isPathologyLoading] = usePathology();

    const location = useLocation();

    if (loading || isPathologyLoading) {
        return <div className='flex justify-center items-center h-screen'>
            <img src={lodingImg} alt="" />
        </div>
    }

    if (user && isPathology) {
        return children;
    }


    return <Navigate to='/login' state={{ from: location }} replace></Navigate>


};

export default PathologyRoute;