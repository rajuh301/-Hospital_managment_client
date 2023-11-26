
import React, { useEffect, useState } from 'react';
import useAdmin from '../../hooks/useAdmin';
import useRegister from '../../hooks/useRegister';
import useDoctor from '../../hooks/useDoctor';
import NarmalUsers from './NarmalUsers';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import bg from '../../../public/registerBG.gif'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Doctor from '../Doctor/Doctor';
import usePhermacy from '../../hooks/usePhermacy';
import Phermacy from './Phermacy';
import Admin from './Admin';
import usePathology from '../../hooks/usePhotology';
import Pathology from './Pathology';



const Dashboard = () => {
    const [isAdmin] = useAdmin([]);
    const [isRegister] = useRegister([]);
    const [isDoctor] = useDoctor([]);
    const [isPhermacy] = usePhermacy([])
    const [isPathology] = usePathology([])



    // // ---------------------------- Register area---------------------------------
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [charge, setCharge] = useState('');
    const [physicalProblem, setPhysicalProblem] = useState('');
    const [doctorReferral, setDoctorReferral] = useState('Select One');
    const [patientType, setPatientType] = useState('Select One');



    const date = new Date()
    const pId = Math.floor(Math.random() * 1000 + 1)

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/registerDownload";

    const handleRegisterPatient = async () => {

        const newPatient = {
            name: patientName,
            age: patientAge,
            problem: physicalProblem,
            referral: doctorReferral,
            type: patientType,
            date: date,
            patienID: pId,
            charge: charge,
        };

        fetch('http://localhost:5000/addPasent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPatient),
        })
        navigate(from, { replace: true });


    };



    // // ---------------------------- Register area---------------------------------


    // ------------------------- doctor Function---------------------
    const [doctors, setDoctors] = useState()

    useEffect(() => {
        fetch('http://localhost:5000/doctors')
            .then(res => res.json())
            .then(data => setDoctors(data))
            .catch(error => console.error("Error fetching data: ", error));
    }, [])



    // ------------------------- doctor Function---------------------

    return (
        <div>

            {
                isAdmin ?

                    <Admin />

                    : <NarmalUsers></NarmalUsers>

                        && isRegister ?
                        // --------------------------- Register area ------------------------
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

                                                <Link to='/' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Home</Link>

                                                <Link to='/PatientReport' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Patient report</Link>

                                            </ul>
                                        </div>
                                        <Navbar />
                                    </div>
                                    <div className="navbar-center hidden lg:flex">
                                        <ul className="menu menu-horizontal px-1">

                                            <div className='flex gap-5 font-bold'>

                                                <Link to='/' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Home</Link>

                                                <Link to='/PatientReport' className='hover:text-white hover:bg-pink-600  p-2 rounded'>Patient report</Link>

                                            </div>

                                        </ul>
                                    </div>
                                    <div className="navbar-end">
                                        <a className="btn">Button</a>
                                    </div>
                                </div>
                            </div>

                            {/* -------------------- Navbar-------------------------- */}


                            <div className=''>
                                <img className='w-full md:h-auto h-[670px]' src={bg} alt="" />


                            </div>
                            <div className="max-w-md mx-auto p-6 absolute md:top-20 top-0 md:left-[38%] left-6 md:mt-0 mt-20 bg-gradient-to-r opacity-96 rounded-lg shadow-lg text-black">
                                <h1 className="text-white text-2xl font-semibold mb-4">Patient Registration Form</h1>
                                <form className='bg-white bg-opacity-25 p-4 rounded-md backdrop-blur-lg max-w-xl' onSubmit={handleRegisterPatient}>
                                    <div className="mb-4">
                                        <label className="block text-white">Patient Name:</label>
                                        <input
                                            required
                                            type="text"
                                            value={patientName}
                                            placeholder='Input patient name'
                                            onChange={(e) => setPatientName(e.target.value)}
                                            className="border border-gray-400 p-2 rounded w-full "
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Patient Age:</label>
                                        <input
                                            required
                                            type="text"
                                            value={patientAge}
                                            placeholder='Input age'
                                            onChange={(e) => setPatientAge(e.target.value)}
                                            className="border border-gray-400 p-2 rounded w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Physical Problem:</label>
                                        <input
                                            required
                                            type="text"
                                            value={physicalProblem}
                                            placeholder='Write physical problems'
                                            onChange={(e) => setPhysicalProblem(e.target.value)}
                                            className="border border-gray-400 p-2 rounded w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Doctor Referral:</label>
                                        <select
                                            required
                                            value={doctorReferral}
                                            onChange={(e) => setDoctorReferral(e.target.value)}
                                            className="border border-gray-400 p-2 rounded w-full"
                                        >
                                            <option value="Select One">Select One</option>

                                            {doctors && doctors.map((doctor) => (
                                                <option key={doctor._id} value={doctor.name}>
                                                    {doctor.name} ({doctor.specialty})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-white">Patient Type:</label>
                                        <select
                                            required
                                            value={patientType}
                                            onChange={(e) => setPatientType(e.target.value)}
                                            className="border border-gray-400 p-2 rounded w-full"
                                        >
                                            <option value="Select One">Select One</option>
                                            <option value="New Patient">New Patient</option>
                                            <option value="Returning Patient">Returning Patient</option>
                                            <option value="Emergency">Emergency</option>
                                        </select>
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-white">Charge:</label>
                                        <input
                                            required
                                            type="text"
                                            value={charge}
                                            placeholder='Input amount'
                                            onChange={(e) => setCharge(e.target.value)}
                                            className="border border-gray-400 p-2 rounded w-full"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                    >
                                        Register Patient
                                    </button>
                                </form>
                            </div>
                        </div>


                        // --------------------------- Register area ------------------------

                        : <NarmalUsers></NarmalUsers>

                            && isDoctor ?

                            // -------------------------- Doctor area----------------------------

                            <Doctor></Doctor>

                            // -------------------------- Doctor area----------------------------


                            : <NarmalUsers></NarmalUsers>

                                && isPhermacy ?
                                <Phermacy></Phermacy>

                                : <NarmalUsers></NarmalUsers>

                                    && isPathology ?
                                    <Pathology></Pathology>

                                    : <NarmalUsers></NarmalUsers>

            }


        </div>
    );
};

export default Dashboard;