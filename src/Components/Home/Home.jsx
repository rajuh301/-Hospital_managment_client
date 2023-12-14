import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import bg from '../../../public/bg.jpg'
import bg2 from '../../../public/bg2.jpg'

const Home = () => {
    return (
        <div>
            {/* ----------Navbar----------- */}
            <div>
                <div className="navbar bg-h-14 bg-gradient-to-r from-cyan-500 to-blue-500">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
{/* 
                                <Link to='/' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Notic</Link>

                                <Link to='/' className='hover:text-white hover:bg-pink-600  p-2 rounded'>My Account</Link> */}

                            </ul>
                        </div>
                        <Navbar />
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">

                            <div className='flex gap-5 font-bold'>
{/* 
                                <Link to='/' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Notic</Link>

                                <Link className='hover:text-white hover:bg-pink-600  p-2 rounded'>My Account</Link> */}



                            </div>

                        </ul>
                    </div>
                    <div className="navbar-end">
                        <a className="btn">Button</a>
                    </div>
                </div>
            </div>
            {/* ----------Navbar----------- */}
            <img className='md:w-full md:block hidden md:h-[700px] opacity-96' src={bg} alt="" />
            <img className='md:w-full md:hidden' src={bg2} alt="" />
            <div className='absolute top-24 md:left-60 left-10'>

                <p className='md:text-5xl text-center text-4xl font-bold text-blue-500'><span className='inline-block animate-bounce'>Welcome to Hospital Managment System</span></p>

                <div className='flex justify-center gap-10 items-center md:h-[600px] h-52'>

                    <div>
                        <Link to='/dashboard' className="bg-white md:bg-opacity-96 bg-opacity-0 p-4 rounded-md backdrop-blur-lg btnbtn-primary btn-secondary text-slate-600 font-bold md:text-5xl md:h-28">Get start</Link>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default Home;