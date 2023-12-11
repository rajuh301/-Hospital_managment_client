import React, { useEffect, useRef, useState } from 'react';
import logo from '../../../public/logo.png'
import hospital from '../../../public/hospital.png'
import { useReactToPrint } from 'react-to-print';
import { FaCashRegister, FaPrint } from 'react-icons/fa';
import Swal from 'sweetalert2';



const ReportOnDoctorSite = ({ datas, pasentData }) => {






    return (
        <div>



            <div className='border mt-5 shadow-lg'>

                {/* ------------------------ Pad Design ------------------ */}
                <div className='w-full h-42 px-5 text-center bg-gradient-to-r from-cyan-200 to-blue-200'>
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

                {/* ------------------------ Pad Design ------------------ */}



                <div className='w-full h-[842px] py-10'>

                    <div className='text-right px-2 font-bold'>
                        <p>Doctor : {datas?.doctor}</p>
                        <p>Pashent name : {pasentData?.name}</p>
                        <p>Pashent age : {pasentData?.age}</p>
                    </div>

                    <p className='mt-10 text-3xl text-center font-bold'>Reports</p>
                    <hr className='w-52 mx-auto border-t-4 mt-1 border-green-200' />


                    <div className='text-left px-2 font-bold'>

                        <p>Report Name : {datas?.test}</p>
                        <p>Report description : {datas?.inputValue}</p>
                        <p>Report Date: {datas?.timestamp ? new Date(datas.timestamp).toLocaleString() : ''}</p>
                      
                    </div>


                    <div className='absolute top-[450px] md:w-[500px] opacity-10 left-96'>

                        <img className='w-[650px] p-1' src={logo} alt="" />


                    </div>


                    <div className='mt-20 mx-10 font-bold'>
                        <p>{datas?.report}</p>
                    </div>


                </div>
            </div>

    




        </div>
    );
};

export default ReportOnDoctorSite;