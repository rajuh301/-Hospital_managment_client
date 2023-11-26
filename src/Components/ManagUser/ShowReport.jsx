import React, { useEffect, useRef, useState } from 'react';
import logo from '../../../public/logo.png'
import hospital from '../../../public/hospital.png'
import { useReactToPrint } from 'react-to-print';
import { FaCashRegister, FaPrint } from 'react-icons/fa';
import Swal from 'sweetalert2';



const ShowReport = ({ datas, pasentData }) => {


    // ---------------------- Print Function---------------
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // ---------------------- Print Function---------------

    // ----------------------------- sum function ---------------------
    const [Tcharge, setTcharge] = useState(0)

    const testCharge = (charge) => {
    Swal.fire({
        title: 'Confirm Charge Update',
        text: 'Are you sure you want to update the charge?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'Cancel',
    })
    
    .then((result) => {
        if (result.isConfirmed) {
            const numericCharge = parseFloat(charge) || 0;
            const updatedCharge = Tcharge + numericCharge;
            setTcharge(updatedCharge);

            // Send POST request to server
            fetch('http://localhost:5000/testCharge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ charge: updatedCharge }),
            })
                .then(response => {
                    // Handle response if needed
                    Swal.fire({
                        icon: 'success',
                        title: 'Charge Updated',
                        text: 'The charge has been successfully updated!',
                    });
                })
                .catch(error => {
                    // Handle errors if any
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    });
                });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Update Cancelled',
                text: 'The charge update has been cancelled.',
            });
        }
    });
};






    console.log(Tcharge)

    // ----------------------------- sum function ---------------------



    return (
        <div>



            <div ref={componentRef}>

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



                <div className='w-full h-[842px] border shadow py-10'>

                    <div className='text-right px-2 font-bold'>
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


                    <div className='absolute top-[400px] opacity-10 left-40 rotate-45'>

                        <img className='w-[650px] p-1' src={logo} alt="" />


                    </div>


                    <div className='mt-20 mx-10 font-bold'>
                        <p>{datas?.report[0]}</p>
                    </div>


                </div>
            </div>

            {
                datas &&

                <div className='text-right text-3xl mx-5'>
                    <small>Charge: {datas.charge}</small>

                    <button className='btn' onClick={() => testCharge(datas?.charge)}>
                        <FaCashRegister className='text-3xl'></FaCashRegister>
                    </button>
                    <button className='btn' onClick={handlePrint}>

                        <FaPrint className='text-3xl'></FaPrint>
                    </button>

                </div>
            }





        </div>
    );
};

export default ShowReport;