import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
const Pathology = () => {
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



    // ---------------- Report submit -------------------
    const [modalText, setModalText] = useState();
    let [index, setSelectedTestId] = useState(null)



    const submitReport = async () => {
    try {
        const reportIdToUpdate = searchData._id;
        const reportText = modalText;

        if (reportIdToUpdate && reportText && index !== undefined) {
            const response = await fetch(`http://localhost:5000/updateTest/${reportIdToUpdate}/${index}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: reportText }), // Send 'data' instead of 'report'
            });

            if (response.ok) {
                // Handle success
                console.log('Report patched successfully!');
            } else {
                // Handle error
                console.error('Failed to patch report');
            }
        } else {
            console.error('Missing report ID, text, or index');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};






    // ---------------- Report submit -------------------




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



            {/* -------------- Show Test ------------- */}

            <div className="container mx-auto py-8">
                {searchData && searchData.test && searchData.test.length > 0 ? (
                    <div className="max-w-full mx-32 mt-10">
                        {searchData.test.map((da, index) => (
                            <div className="text-center border py-5 shadow mt-2 rounded-lg" key={index}>
                                <small className="block text-gray-500 mb-2">
                                    <small className=''>{new Date(da.timestamp).toLocaleString()}</small>

                                </small>
                                <p>{da.test}</p>
                                <p>{da.inputValue}</p>
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                    onClick={() => {
                                        setSelectedTestId(index);
                                        document.getElementById('my_modal_7').showModal();
                                    }}
                                >
                                    Submit Report
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center mt-32 text-gray-600">No data available</p>
                )}
                {/* -------------- Show Test ------------- */}

                {/* --------------------------- Test Report Submit ---------------------- */}

                <form onSubmit={submitReport} action="">
                    <dialog id="my_modal_7" className="modal">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <h3 className="font-bold text-lg">Input Report</h3>

                            <textarea className="border rounded-md p-2 mt-2 w-full"
                                placeholder="Enter report text"
                                onChange={(e) => setModalText(e.target.value)}
                                value={modalText}
                                name="" id="" cols="30" rows="10">
                            </textarea>



                            <div className="modal-action items-center">
                                <button type='submit' className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" >
                                    Save Report
                                </button>

                                <div className="">
                                    <form method="dialog">

                                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Close</button>
                                    </form>
                                </div>


                            </div>
                        </div>
                    </dialog>
                </form>
                {/* --------------------------- Test Report Submit ---------------------- */}

            </div>
        </div>
    );
};

export default Pathology;