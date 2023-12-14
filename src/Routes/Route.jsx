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
import RegAccount from '../Components/ManagUser/RegAccount';
import DisplaySerial from '../Components/ManagUser/DisplaySerial';
import RegisterRoute from './RegisterRoute';
import Requisition from '../Components/ManagUser/Requisition';
import PathologyRoute from './PathologyRoute';
import RequisitionInAdmin from '../Components/ManagUser/RequisitionInAdmin';
import RegRequisition from '../Components/ManagUser/RegRequisition';
import ShowRequistion from '../Components/ManagUser/ShowRequistion';
import ShowQrCodeData from '../Components/ManagUser/ShowQrCodeData';


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
        element: <PrivateRoute><PatientReport></PatientReport></PrivateRoute>
    },

    {
        path: "/regAccount",
        element: <RegisterRoute><RegAccount></RegAccount></RegisterRoute>
    },

    {
        path: "/regRequisition",
        element: <RegisterRoute><RegRequisition></RegRequisition></RegisterRoute>
    },
    
    {
        path: "/requisition",
        element: <PathologyRoute><Requisition></Requisition></PathologyRoute>
    },

    {
        path: "/showRequisition",
        element: <PathologyRoute><ShowRequistion></ShowRequistion></PathologyRoute>
    },

    {
        path: "/displayCount",
        element:<DisplaySerial></DisplaySerial> 
    },

    {
        path: "/https://rainbow-rabanadas-e2c23b.netlify.app/viewData/:id",
        element:<ShowQrCodeData></ShowQrCodeData>
    },

    {
        path: "/requestRequisition",
        element:<AdminRoute><RequisitionInAdmin></RequisitionInAdmin></AdminRoute>
    },





]);



