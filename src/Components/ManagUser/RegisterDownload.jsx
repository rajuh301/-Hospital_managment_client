import React, { useEffect, useRef, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import QRCode from 'react-qr-code';
import { useReactToPrint } from 'react-to-print';

const RegisterDownload = () => {

    const [download, setDownload] = useState('')
    useEffect(() => {
        fetch('http://localhost:5000/pasent')
            .then(res => res.json())
            .then(data => setDownload(data))
    }, [])


    const results = (download[download.length - 1]);

    const convert = results?._id


    const qrValue = (`http://localhost:5173/viewData/${convert}`)
    // ---------------------- Print Function---------------
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    // ---------------------- Print Function---------------

    return (
        <div>
            <div ref={componentRef} className='flex justify-center mt-10 p-2 text-center'>


                <div className="card w-[450px] bg-primary text-primary-content">
                    <p className='font-bold'>Popular Hospital</p>
                    <small>Date : {results?.date}</small>
                    <div className="card-body">

                        <div className='flex gap-5'>

                            <div className='block'>
                                <h2 className="card-title">Patien ID : {results?.patienID}</h2>

                                <QRCode className='mt-5'
                                    size={256}
                                    style={{ height: "60", maxWidth: "50%", width: "50%" }}
                                    value={qrValue}
                                    viewBox={`0 0 256 256`}
                                />
                            </div>

                            <div className='w-1 h-40 bg-white'>

                            </div>



                            <div className='text-start'>
                                <p>Patien Name : {results?.name}</p>
                                <p>Age : {results?.age}</p>
                                {/* <p>Physical problem : {results?.problem}</p> */}
                                <p>Referral : {results?.referral}</p>
                                {/* <p>Charge : {results.charge}</p> */}
                            </div>


                        </div>

                        <div className="card-actions justify-end">

                            {/* <button className="btn btn-xs">Print</button> */}

                        </div>
                    </div>
                </div>

            </div>


            <div className='text-center text-3xl'>
                <button className='btn btn-primary' onClick={handlePrint}>

                    <FaPrint className='text-3xl text-white'></FaPrint>
                </button>
            </div>

        </div>
    );
};

export default RegisterDownload;