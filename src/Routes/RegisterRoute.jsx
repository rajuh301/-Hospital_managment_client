import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../hooks/UseAuth';
import useRegister from '../hooks/useRegister';
import lodingImg from '../../public/loading.gif'

const RegisterRoute = ({ children }) => {
    const { user, loading } = UseAuth();
    const [isRegister, isRegisterLoading] = useRegister();

    const location = useLocation();

    if (loading || isRegisterLoading) {
        return <div className='flex justify-center items-center h-screen'>
        <img src={lodingImg} alt="" />
    </div>
        
    }

    if (user && isRegister) {
        return children;
    }


    return <Navigate to='/login' state={{ from: location }} replace></Navigate>


};

export default RegisterRoute;