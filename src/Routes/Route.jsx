import React from 'react';

import {
    createBrowserRouter,
} from "react-router-dom";
import Main from '../Components/Home/Main';
import Register from '../Components/Register/Register';
import Login from '../Components/Login/Login';
import Dashboard from '../Components/ManagUser/Dashboard';
import PrivateRoute from './PrivateRoute';
import RegisterDownload from '../Components/ManagUser/RegisterDownload';
import ShowPatienData from '../Components/ManagUser/ShowPatienData';
import AdminRoute from './AdminRoute';
import AdminAccount from '../Components/Accounts/AdminAccount';
import AddDoctors from '../Components/Accounts/AddDoctors';
import ManageRoal from '../Components/ManagUser/ManageRoal';
import AddTest from '../Components/ManagUser/AddTest';
import PatientReport from '../Components/ManagUser/PatientReport';


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [

        ]
    },

    {
        path: "/register",
        element: <Register></Register>
    },
    {
        path: "/login",
        element: <Login></Login>
    },

    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>
    },

    {
        path: "/registerDownload",
        element: <RegisterDownload></RegisterDownload>
    },

    {
        path: "/viewData/:id",
        element: <ShowPatienData></ShowPatienData>,
    },

    {
        path: "/account",
        element: <AdminRoute><AdminAccount></AdminAccount></AdminRoute>
    },
    {
        path: "/addDoctor",
        element: <AdminRoute><AddDoctors></AddDoctors></AdminRoute>
    },
    {
        path: "/addTest",
        element: <AdminRoute><AddTest></AddTest></AdminRoute>
    },
  
    {
        path: "/manageRoal",
        element: <AdminRoute><ManageRoal></ManageRoal></AdminRoute>
    },

    {
        path: "/PatientReport",
        element: <PatientReport></PatientReport>
    },
  




]);



