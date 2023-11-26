import React, { useContext, useEffect, useState } from 'react';
import { FaAccessibleIcon, FaGoogle, FaMarsDouble, FaSearch } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';

const Doctor = () => {
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



    // --------------------------- Make a prediction---------------
    const [Prediction, setPrediction] = useState()

    const handlePrediction = (e) => {
        setPrediction(e.target.value)

    }


    const makePrediction = (e) => {
        setPrediction(e.target.value)
        if (searchData && searchData._id) {

            fetch(`http://localhost:5000/pasent/${searchData._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: Prediction }),
            })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been done',
                showConfirmButton: false,
                timer: 1500
            })


        } else {
            console.error('Invalid searchData:', searchData);
        }
    };


    // --------------------------- Make a prediction---------------

    const [showText, setShowText] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowText(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    // ---------------------------- test area ---------------------
    const [testSelect, setTestSelect] = useState()
    useEffect(() => {
        fetch('http://localhost:5000/addTest')
            .then((res) => res.json())
            .then((data) => setTestSelect(data));
    }, [])


    // ------------------------ Submitd Area ---------------------
    const [selectedTests, setSelectedTests] = useState({});

    const handleCheckboxChange = (event, test) => {

        const isChecked = event.target.checked;
        setSelectedTests(prevState => ({
            ...prevState,
            [test._id]: isChecked ? { testName: test.testName, inputValue: '', price: test.price } : null,
        }));
    };

    const handleTextInputChange = (event, test) => {
        const inputValue = event.target.value;
        setSelectedTests(prevState => ({
            ...prevState,
            [test._id]: {
                ...(prevState[test._id] || {}),
                testName: test.testName,
                inputValue,
            },
        }));
    };

    const updateTests = async (event) => {
        event.preventDefault();

        const formattedTests = Object.values(selectedTests)
            .filter(test => test !== null)
            .map(test => ({
                testName: test.testName,
                price: test.price,
                inputValue: test.inputValue,

            }));


        if (confirm) {
            try {
                const response = await fetch(`http://localhost:5000/tests/${searchData._id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add any other necessary headers
                    },
                    body: JSON.stringify(formattedTests),
                });
                if (response.ok) {
                    Swal.fire({
                        title: "Good job!",
                        text: "You clicked the button!",
                        icon: "success"
                    });
                    window.location.reload();
                }

                // Handle response as needed
            } catch (error) {
                // Handle error
            }
        } else {
            // Handle cancellation or do nothing
        }
    };




    // ------------------------ Submitd Area ---------------------




    // ---------------------------- test area ---------------------

    return (
        <div>
            {/* -------------------------------------  Nav area----------------------------- */}

            {/* -------------------- Navbar-------------------------- */}

            {showText && (
                <div className='animate-bounce duration-2000 text-5xl font-bold absolute left-[600px] top-96 ' style={{ display: 'inline-block' }}>
                    <p>Welcome {user.displayName}</p>
                </div>
            )}




            <div>
                <div className="navbar bg-green-400">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>


                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">

                                <Link to='/' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Notic</Link>

                                <Link to='/' className='hover:text-white hover:bg-pink-600  p-2 rounded'>My Account</Link>

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

                                <Link className='hover:text-white hover:bg-pink-600  p-2 rounded'>My Account</Link>

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
            {/* -------------------------------------  Nav area----------------------------- */}


            <div className="text-center p-2 md:grid grid-cols-5 gap-10">




                {
                    searchData &&

                    <button className='border shadow-lg rounded-lg p-5 md:text-3xl hover:bg-green-400 font-bold ' onClick={() => document.getElementById('my_modal_4').showModal()}>
                        Make a prediction
                    </button>
                }

                <div className='md:hidden'>

                </div>
                {
                    searchData &&

                    <button className='border shadow-lg rounded-lg p-5 md:text-3xl hover:bg-green-400 font-bold' onClick={() => document.getElementById('my_modal_3').showModal()}>
                        Reference Test
                        <FaMarsDouble></FaMarsDouble>
                    </button>



                }

                {
                    searchData &&

                    <button className='border shadow-lg rounded-lg p-5 md:text-3xl hover:bg-green-400 font-bold '>
                        Need Opration
                        <FaAccessibleIcon></FaAccessibleIcon>
                    </button>
                }



                {
                    searchData ?

                        <div className='border shadow-lg rounded-lg p-5 font-bold '>
                            <div className=' gap-5'>
                                <small>Date : {searchData?.date}</small>

                                <small className='text-start'>
                                    <p>Patien Name : {searchData?.name}</p>
                                    <p>Age : {searchData?.age}</p>
                                    <p>Physical problem : {searchData?.problem}</p>
                                    <p>Referral : {searchData?.referral}</p>
                                </small>


                            </div>

                        </div>

                        : ''
                }





            </div>





            {/* ---------------------------- Design --------------------- */}

            {/* You can open the modal using document.getElementById('ID').showModal() method */}

            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Prediction</h3>

                    {/* ----------------- Main content---------------- */}


                    <div>
                        <form onSubmit={makePrediction}>
                            <textarea className='border-4 md:w-full w-72 h-52 shadow-lg p-5'
                                onChange={handlePrediction} // You should use onChange to update the Prediction state
                                value={Prediction}
                                name="Prediction" // Add a name attribute to identify the textarea in the event handler
                                id="prediction"

                                placeholder="Write the Prediction"
                            >
                            </textarea>
                            <button type="submi" className="btn absolute left-5 bottom-2">Submit</button>
                        </form>
                    </div>
                    {/* ----------------- Main content---------------- */}


                    <div className="modal-action">

                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost right-2 top-2 absolute">✕</button>
                        </form>
                    </div>
                </div>
            </dialog>

            {/* ----------------------------- Test area --------------------- */}

            <dialog id="my_modal_3" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">{searchData?.name}</h3>



                    {/* ------------------------- Main content --------------------- */}
                    <form onSubmit={updateTests}>
                        <div className="text-3xl">
                            {testSelect?.map(test => (
                                <div
                                    key={test._id}
                                    className="flex items-center justify-between border py-2 px-4 my-2 rounded-lg shadow-md"
                                >
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            value={test.testName}
                                            className="checkbox theme-controller"
                                            onChange={event => handleCheckboxChange(event, test)}
                                        />
                                        <span>{test.testName}</span>
                                    </label>
                                    {selectedTests[test._id] && (
                                        <input
                                            type="text"
                                            placeholder="Type here"
                                            className="input input-bordered input-primary w-3/4 max-w-3xl px-2 py-1 rounded-md"
                                            value={selectedTests[test._id]?.inputValue || ''}
                                            onChange={event => handleTextInputChange(event, test)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <button type='submit' className='btn btn-success mt-5'>Submit</button>
                    </form>
                    {/* ------------------------- Main content --------------------- */}


                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* ----------------------------- Test area --------------------- */}

            {/* ---------------------------- Design --------------------- */}



        </div >
    );
};

export default Doctor;