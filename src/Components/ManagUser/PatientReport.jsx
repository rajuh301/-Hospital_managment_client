import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import { FaPrint, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import logo from '../../../public/logo.png'
import hospital from '../../../public/hospital.png'
import { useReactToPrint } from 'react-to-print';
import ShowReport from './ShowReport';
const PatientReport = () => {
    const [searchData, setSearchData] = useState(null);
    const [datas, setDatas] = useState([]);
    const [patientId, setPatientId] = useState('');
    const { user } = useContext(AuthContext)


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



    // -------------------------- test map function ----------------






    // -------------------------- test map function ----------------



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


                                <Link to='/account' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Account</Link>
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

            {/* -------------------- Navbar-------------------------- */}


            {/* ------------------------ Main Contant ----------------------- */}
            <div >


                {searchData &&

                    <div className='w-595 h-842 border shadow mx-5 mt-5'>
                        

                        <div className='mt-5 font-bold mx-10'>
                          

                        </div>
                        <div className='text-center'>
                            
       


                            {/* ----------------- Report ----------------- */}
                            <div>


                                {
                                    searchData?.test?.map(da => <ShowReport
                                        key={da.index}
                                        datas={da}
                                        pasentData = {searchData}
                                    ></ShowReport>)
                                }

                            </div>

                            {/* ----------------- Report ----------------- */}


                        </div>



                        {/* ------------------------ Main Contant ----------------------- */}
                    </div>
                }
            </div>

            
        </div>
    );
};

export default PatientReport;