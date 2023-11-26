import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

const Admin = () => {
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

                                <Link to='/addDoctor' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Add Doctor</Link>

                                <Link className='hover:text-white hover:bg-pink-600  p-2 rounded'>Add Employ</Link>

                                <Link className='hover:text-white hover:bg-pink-600  p-2 rounded'>Add Test</Link>
                                
                                <Link to='/manageRoal' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Manage Roal</Link>

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

                                <Link to='/account' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Account</Link>

                            </div>

                        </ul>
                    </div>
                    <div className="navbar-end">
                        <a className="btn">Button</a>
                    </div>
                </div>
            </div>

            {/* -------------------- Navbar-------------------------- */}


        </div>
    );
};

export default Admin;