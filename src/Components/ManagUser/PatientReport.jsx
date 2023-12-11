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
        const fetchData = () => {
            fetch('http://localhost:5000/pasent')
                .then((res) => res.json())
                .then((data) => setDatas(data))
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchData();
        const intervalId = setInterval(fetchData, 2000);
        return () => clearInterval(intervalId);
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



    // -------------------------- Opration map function ----------------
    const handleSubmit = async (event, da, index) => {
        event.preventDefault();

        const inputValue = event.target.elements.inputAmount.value;

        const inputData = {
            index: index,
            inputAmount: inputValue,

        };

        try {
            const response = await fetch(`http://localhost:5000/updateOperation/${searchData._id}/${index}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inputData),
            });


            if (response.ok) {
      
         
                
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Failed to update data",
                    text: "Please try again later",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "An error occurred",
                text: "Please try again later",
            });
            console.error('Error:', error);
        }
    };






    // -------------------------- Opration map function ----------------



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

                                {searchData &&
                                    <button onClick={() => document.getElementById('my_modal_4').showModal()} className='hover:text-white hover:bg-pink-600  p-2 rounded'>Operation</button>
                                }

                                {searchData &&
                                    <button onClick={() => document.getElementById('my_modal_5').showModal()} className='hover:text-white hover:bg-pink-600  p-2 rounded'>Prescription</button>
                                }

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
                                        pasentData={searchData}
                                    ></ShowReport>)
                                }

                            </div>

                            {/* ----------------- Report ----------------- */}


                        </div>



                        {/* ------------------------ Main Contant ----------------------- */}
                    </div>
                }
            </div>

            {/* -------------------------------------- Info -------------------------------- */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-full">
                    <h3 className="font-bold text-lg">{searchData?.name}</h3>


                    {/* ------------------------- Main Content ------------------- */}

                    <table className="min-w-full shadow-slate-600 text-left">
                        <thead>
                            <tr className="bg-green-200">
                                <th className="px-6 py-3">Timestamp</th>
                                <th className="px-6 py-3">Doctor</th>
                                <th className="px-6 py-3">Operation</th>
                                <th className="px-6 py-3">Input Value</th>
                                <th className="px-2 py-3">Input Amount</th>
                                <th className="px-2 py-3">Submit</th>
                            </tr>
                        </thead>
                        <tbody className='bg-slate-200'>
                            {searchData?.operation?.map((da, index) => (
                                <tr key={index}>
                                    <td className="border px-6 py-4">{new Date(da.timestamp).toLocaleString()}</td>
                                    <td className="border px-6 py-4">{da.doctor}</td>
                                    <td className="border px-6 py-4">{da.operation}</td>
                                    <td className="border px-6 py-4">{da.inputValue}</td>
                                    <td className="border">
                                        <form onSubmit={(event) => handleSubmit(event, da, index)}>
                                            <input className='w-28 border shadow bg-slate-700 text-white rounded-md py-1 px-2' type="number" name="inputAmount"
                                                disabled={da.price !== undefined}

                                            />


                                            <button type="submit" className={`ml-2 font-bold px-4 rounded focus:outline-none focus:shadow-outline ${da.price !== undefined ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'
                                                }`}
                                                disabled={da.price !== undefined} >
                                                {da.price !== undefined ? 'Complete' : 'Submit'}
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>



                    {/* ------------------------- Main Content ------------------- */}


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* -------------------------------------------------------------------------------- */}
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">{searchData?.name}</h3>


                    {/* ------------------------- Main Content ------------------- */}
                    <form action="">

                    </form>
                    {/* ------------------------- Main Content ------------------- */}


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* -------------------------------------- Info -------------------------------- */}


        </div>
    );
};

export default PatientReport;