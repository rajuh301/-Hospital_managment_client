import React, { useContext } from 'react';
import { AuthContext } from '../Components/provider/AuthProvider';


const UseAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default UseAuth;