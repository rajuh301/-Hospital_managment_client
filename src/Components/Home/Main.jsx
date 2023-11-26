import React from 'react';
import Home from './Home';
import { Outlet } from 'react-router-dom';


const Main = () => {
    return (
        <div>
      
            <Home></Home>
            <Outlet></Outlet>

        </div>
    );
};

export default Main;