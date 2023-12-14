import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart } from 'recharts';

const Admin = () => {

    // ----------------- chart function -----------

    const [datas, setDatas] = useState([]);


    useEffect(() => {
        const fetchData = () => {
            fetch('https://hospital-managment-server.vercel.app/pasent')
                .then((res) => res.json())
                .then((data) => setDatas(data))
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);


    //   -------------------------------
    const filterDataByMonth = (data, month) => {
        return data.filter((item) => {
            const itemMonth = new Date(item.date).getUTCMonth() + 1; // Extract month from UTC date
            return itemMonth === month;
        });
    };

    const generateChartData = (data) => {
        const chartData = [];
        // Assuming you want to count patients for each month
        const monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        for (let i = 1; i <= 12; i++) {
            const patientsInMonth = filterDataByMonth(data, i).length;
            chartData.push({ month: monthNames[i - 1], patients: patientsInMonth });
        }
        return chartData;
    };

    const chartData = generateChartData(datas);


    // ----------------- chart function -----------



    return (
        <div className=''>
            {/* -------------------- Navbar-------------------------- */}

            <div>
                <div className="navbar bg-h-14 bg-gradient-to-r from-cyan-500 to-blue-500">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                                <Link to='/addDoctor' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Add Doctor</Link>

                                <Link className='hover:text-white hover:bg-pink-600  p-2 rounded'>Add Employ</Link>

                                <Link to='/addTest' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Add Test</Link>

                                <Link to='/manageRoal' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Manage Roal</Link>

                                <Link to='/requestRequisition' className='hover:text-white hover:bg-pink-600 p-2 rounded'>Requisition</Link>

                                <Link to='/account' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Account</Link>

                            </ul>
                        </div>
                        <Navbar />
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">

                            <div className='flex gap-5 font-bold'>

                                <Link to='/addDoctor' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Add Doctor</Link>

                                <Link className='hover:text-white hover:bg-pink-600  p-2 rounded'>Add Employ</Link>

                                <Link to='/addTest' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Add Test</Link>

                                <Link to='/manageRoal' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Manage Roal</Link>

                                <Link to='/requestRequisition' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Requisition</Link>

                                <Link to='/account' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Account</Link>

                            </div>

                        </ul>
                    </div>
                    <div className="navbar-end">
                        <p className='font-bold px-5'>Admin Area</p>
                        <a className="btn">Action</a>
                    </div>
                </div>
            </div>

            {/* -------------------- Navbar-------------------------- */}
            {/* ------------------ chart ----------- */}
            <div className='md:flex justify-between'>

                <div className="w-full md:block hidden mx-auto mt-10">
                    <p className='md:ml-80 md:text-2xl'>Patients Data</p>
                    <div style={{ width: '100%', height: '300px' }}>
                        <BarChart width={800} height={400} data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="patients" fill="#4299e1" />
                        </BarChart>
                    </div>
                </div>
                {/* ------------------- for mobile -------- */}
                <div className="w-full md:hidden block mx-auto mt-10">
                    <p className='font-bold text-center'>Patients Data</p>
                    <div style={{ width: '100%', height: '300px' }}>
                        <BarChart width={350} height={200} data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="patients" fill="#4299e1" />
                        </BarChart>
                    </div>
                </div>

                {/* <div className="w-full max-w-md mx-auto">
                    <LineChart width={500} height={300} data={operationData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="operationCount" stroke="#8884d8" />
                    </LineChart>
                </div> */}
            </div>

            {/* ------------------ chart ----------- */}

        </div>
    );
};

export default Admin;