import React, { useEffect, useRef, useState } from 'react';
import { FaPrint, FaSearch } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import logo from '../../../public/logo.png'
import hospital from '../../../public/hospital.png'
import { useReactToPrint } from 'react-to-print';

const Phermacy = () => {
    const [searchData, setSearchData] = useState(null);
    const [datas, setDatas] = useState([]);
    const [patientId, setPatientId] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/pasent')
            .then((res) => res.json())
            .then((data) => setDatas(data));
    }, []);

    const search = (e) => {
        e.preventDefault();
        if (datas) {
            const searching = datas.find((da) => da.patienID === parseInt(patientId, 10));
            setSearchData(searching ? searching : 'Patient not found');
        }

    };


    const handleInputChange = (e) => {
        setPatientId(e.target.value);
    };

    // ---------------------- Print Function---------------
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // ---------------------- Print Function---------------



    return (
        <div className='text-center'>
            {/* -------------------- Navbar-------------------------- */}



            <div>
                <div className="navbar bg-green-400">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>


                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                                <Link to='/' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Notic</Link>

                                <Link to='/PatientReport' className='hover:text-white hover:bg-pink-600  p-2 rounded'>My Account</Link>

                                {/* ----------------- search Bar--------------------- */}

                                <form className='flex items-center' onSubmit={search}>
                                    <div className="relative flex-grow">
                                        <input
                                            type="number"
                                            placeholder="Input patient ID"
                                            className="btn w-full text-1xl pl-3 pr-10 py-2 rounded-l"
                                            value={patientId}
                                            onChange={handleInputChange}
                                        />
                                        <button type="submit" className="btn absolute right-0 top-0 bottom-0 rounded-r">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </form>

                                {/* ----------------- search Bar--------------------- */}

                            </ul>
                        </div>
                        <Navbar />
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">

                            <div className='flex gap-5 font-bold'>

                                <Link to='/' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Notic</Link>

                                <Link to='/PatientReport' className='hover:text-white hover:bg-pink-600  p-2 rounded'>My Account</Link>

                                {/* ----------------- search Bar--------------------- */}

                                <form className='flex items-center' onSubmit={search}>
                                    <div className="relative flex-grow">
                                        <input
                                            type="number"
                                            placeholder="Input patient ID"
                                            className="btn w-full text-1xl pl-3 pr-10 py-2 rounded-l"
                                            value={patientId}
                                            onChange={handleInputChange}
                                        />
                                        <button type="submit" className="btn absolute right-0 top-0 bottom-0 rounded-r">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </form>

                                {/* ----------------- search Bar--------------------- */}

                            </div>

                        </ul>
                    </div>
                    <div className="navbar-end">
                        <a className="btn">Button</a>
                    </div>
                </div>
            </div>

            {/* ----------------------------- Navbar-------------------------- */}


            <div className='' >

                {
                    searchData &&
                    <div className='h-[842px]'>
                        <div className='border shadow-lg rounded-lg font-bold'>
                            <div className=' gap-5 '>

                                <div className='text-start ' ref={componentRef}>

                                    {searchData?.prediction?.map(item => (
                                        <div className='px-2' key={item.timestamp}>
                                           
                                            <hr className='font-bold' />
                                            <br />

                                            <div className='h-[1000px]'>


                                                {/* ------------- Pad Design -------------- */}
                                                {searchData &&
                                                    <div className=' px-5 text-center bg-gradient-to-r from-cyan-200 to-blue-200'>
                                                        <div className='flex gap-5 justify-between'>
                                                            <img className='w-24 p-1' src={logo} alt="" />
                                                            <h1 className='text-5xl font-semibold'>Popular Hospital</h1>
                                                            <img className='w-24 p-1' src={hospital} alt="" />

                                                        </div>
                                                        <div>
                                                            <p className='text-3xl font-semibold'>Address: Soroskati, Kalaroa, Satkhira <small>Reg: <small>(221222)</small></small></p>
                                                        </div>
                                                        <p className='font-semibold'>Contact Info: Phone- 01732550760, 01640346918, 01221331121 <span>Email: rajuh301@gmail.com</span></p>

                                                    </div>
                                                }
                                                {/* -------- Pad Design ---------- */}

                                                {/* ------- Copy Section---------- */}

                                                <div className='text-start mt-2'>
                                                    <p>Patien Name : {searchData?.name}</p>

                                                    <div className='flex justify-between'>
                                                        <p>Age : {searchData?.age}</p>
                                                        {/* <p>Physical problem : {searchData?.problem}</p> */}
                                                    </div>

                                                    <div className='flex justify-between'>
                                                    <p>Doctor : {item?.doctor}</p>
                                                        <p className='text-green-800'>Date: {new Date(item.timestamp).toLocaleString()}</p>
                                                    </div>
                                                </div>

                                                <hr class="mt-5 border-gray-500 border-solid border-t-2 w-full mx-auto" />

                                                {/* --- Copy Section------ */}

                                                <div className='mt-5'>


                                                    {item.data.split(/\d+\./).filter(part => part.trim() !== '').map((part, index) => (
                                                        <p key={index}>

                                                            {index + 1}. {part.trim()}
                                                        </p>
                                                    ))}

                                                </div>


                                            </div>


                                        </div>


                                    ))}


                                </div>
                                <div className='mt-5 text-end'>

                                    {searchData &&

                                        <button className='mx-5 btn btn-primary' onClick={handlePrint}>
                                            <FaPrint className='text-3xl'></FaPrint>
                                        </button>
                                    }
                                </div>

                            </div>

                        </div>

                        <div>

                        </div>

                        {/* --------------------------------------------- */}


                        {/* --------------------------------------------- */}

                    </div>

                }

            </div>

            {/* ------------------------------------------------------------------ */}

            {/* ------------------------------------------------------------------ */}
        </div>
    );
};

export default Phermacy;
