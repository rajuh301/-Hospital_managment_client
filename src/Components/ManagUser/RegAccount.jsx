import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bg from '../../../public/registerBG.gif'
import Navbar from '../Navbar/Navbar';
const RegAccount = () => {

    const [cashData, setCashData] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:5000/cashout')
                .then((res) => res.json())
                .then((data) => setCashData(data))
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        };
    
        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const lastOut = cashData[cashData.length - 1];
    const formattedDateTime = lastOut ? new Date(lastOut.timestamp).toLocaleString() : '';

    // ------------ Histery-------------------
    const formatDate = timestamp => {
        const date = new Date(timestamp);
        return date.toLocaleString(); // Adjust format as needed
    };

    const histery = cashData?.map(histery => (
        <div className='flex justify-between shadow border mx-7 mt-3' key={histery.id}>
            <p className='w-40 font-bold'>Name : {histery.doctorName ? histery.doctorName : "ADMIN"} </p>

            <p className='w-52'>Email : {histery.doctorEmail ? histery.doctorEmail : "ADMIN EMAIL"}</p>
            <p className='w-20'>Amount: {histery.inputText} </p>
            <p className='w-52'>Date: {formatDate(histery.timestamp)}</p>

        </div>
    ));

    // ------------ Histery-------------------



    return (
        <div>
            {/* -------------------- Navbar-------------------------- */}

            <div>
                <div className="navbar bg-green-400">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                                <Link to='/dashboard' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Dashboard</Link>
                                {/* 
                                <Link to='/PatientReport' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Patient report</Link>

                                <Link to='/regAccount' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Account</Link> */}

                            </ul>
                        </div>
                        <Navbar />
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">

                            <div className='flex gap-5 font-bold'>

                                <Link to='/dashboard' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Dashboard</Link>

                                {/* <Link to='/PatientReport' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Patient report</Link>

                                <Link to='/regAccount' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Account</Link> */}

                            </div>

                        </ul>
                    </div>
                    <div className="navbar-end">
                        <a className="btn">Button</a>
                    </div>
                </div>
            </div>

            {/* -------------------- Navbar-------------------------- */}




            <button onClick={() => document.getElementById('my_modal_5').showModal()}>
                <div className='w-3/3 h-48 shadow mt-10 mx-10 border text-center rounded'>
                    <p className='text-3xl font-bold p-5'>Last Cash Out</p>
                    <p className='text-3xl p-5 text-center font-bold'>{lastOut?.inputText}</p>
                    <p>{formattedDateTime}</p>
                </div>
            </button>



            {/* -------------------- Third Modal ----------------- */}
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box w-11/12 max-w-7xl">
                    <h3 className="font-bold text-lg">Transaction history!</h3>



                    {/* ----------------------- Main content------------------------ */}
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                <tr className="bg-base-200">


                                    {histery}


                                </tr>

                            </tbody>
                        </table>
                    </div>

                    {/* ----------------------- Main content------------------------ */}



                    <div className="modal-action">
                        <form method="dialog">

                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* -------------------- Third Modal ----------------- */}


        </div>
    );
};

export default RegAccount;