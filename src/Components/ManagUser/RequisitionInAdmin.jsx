import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const RequisitionInAdmin = () => {

    const [requisition, setRequisition] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch('https://hospital-managment-server.vercel.app/requisition')
                .then((res) => res.json())
                .then((data) => setRequisition(data))
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const paindingData = requisition?.filter(da => da.status === true)
    const acceptData = requisition?.filter(da => da.status === 'done')
    const rejectData = requisition?.filter(da => da.status === 'reject')

    // console.log(paindingData)


    // ----------------------- Accept Function ---------------
    const handleAccept = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to accept this request?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Accept',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                // User clicked "Accept"
                const data = {
                    status: 'accepted',
                };

                fetch(`https://hospital-managment-server.vercel.app/requisition/${_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((responseData) => {
                        console.log('PATCH request successful', responseData);
                        // Show success message
                        Swal.fire({
                            icon: 'success',
                            title: 'Accepted!',
                            text: 'The request has been accepted.',
                        });
                    })
                    .catch((error) => {
                        console.error('There was a problem with the PATCH request:', error);
                        // Show error message
                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'There was a problem accepting the request.',
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // User clicked "Cancel" or closed the dialog
                Swal.fire('Cancelled', 'The request acceptance was cancelled', 'info');
            }
        });
    };

    // ----------------------- Accept Function ---------------


    // ----------------------- Reject Function ---------------
    const handleReject = (_id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to reject this request?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'reject',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {

                const data = {
                    status: 'reject',
                };

                fetch(`https://hospital-managment-server.vercel.app/requisition/${_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((responseData) => {
                        console.log('PATCH request successful', responseData);

                        Swal.fire({
                            icon: 'success',
                            title: 'Rejected!',
                            text: 'The request has been rejected.',
                        });
                    })
                    .catch((error) => {
                        console.error('There was a problem with the PATCH request:', error);

                        Swal.fire({
                            icon: 'error',
                            title: 'Error!',
                            text: 'There was a problem accepting the request.',
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {

                Swal.fire('Cancelled', 'The request rejectance was cancelled', 'info');
            }
        });

    }
    // ----------------------- Reject Function ---------------


    return (
        <div>
            <div className='md:flex mt-20 justify-center'>


                <div className='w-40 border h-20 rounded bg-pink-500 text-2xl text-center m-10 hover:bg-green-600 text-white'>
                    <button className="" onClick={() => document.getElementById('my_modal_4').showModal()}>Requisition
                    <p className='boder  bg-yellow-600 p-1 rounded text-white'>{paindingData?.length}</p>
                    </button>
                </div>


                <div className='w-40 border h-20 rounded bg-pink-500 text-2xl text-center m-10 hover:bg-green-600 text-white'>
                    <button className="" onClick={() => document.getElementById('my_modal_5').showModal()}>Accepted
                    <p className='boder  bg-yellow-600 p-1 rounded text-white'>{acceptData?.length}</p>
                    </button>
                </div>

                <div className='w-40 border h-20 rounded bg-pink-500 text-2xl text-center m-10 hover:bg-green-600 text-white'>
                    <button className="" onClick={() => document.getElementById('my_modal_6').showModal()}>Rejected
                    <p className='boder  bg-yellow-600 p-1 rounded text-white'>{rejectData?.length}</p>
                    </button>
                </div>



            </div>

            {/* ------------------- Modals---------------- */}
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Panding</h3>

                    {/* ------------------- content ---------------- */}
                    <div className='w-full px-5 mt-10 rounded'>
                        <div className="overflow-x-auto">
                            <div>
                                <table className="table font-semibold">
                                    <thead>
                                        <tr className="bg-primary-500 text-green-800">
                                            <th className="border border-primary-300 px-4 py-2">Date</th>

                                            <th className="border border-primary-300 px-4 py-2">Product Name</th>

                                            <th className="border border-primary-300 px-4 py-2">Quantity</th>

                                            <th className="border border-primary-300 px-4 py-2">Price</th>

                                            <th className="border border-primary-300 px-4 py-2">Accept</th>

                                            <th className="border border-primary-300 px-4 py-2">Regect</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paindingData.map(da => (
                                            <tr key={da._id} className="bg-base-200">
                                                <td className="border border-primary-300 px-4 py-2">{new Date(da.date).toLocaleDateString()}</td>
                                                <td className="border border-primary-300 px-4 py-2">{da.productName}</td>
                                                <td className="border border-primary-300 px-4 py-2">{da.quantity}</td>

                                                <td className="border border-primary-300 px-4 py-2">{da.price}</td>

                                                <td className="border border-primary-300 px-4 py-2">
                                                    <button onClick={() => handleAccept(da._id)} className='hover:text-green-600'>Accept</button>

                                                </td>

                                                <td className="border border-primary-300 px-4 py-2">
                                                    <button onClick={() => handleReject(da._id)}
                                                        className='hover:text-red-600'>Reject</button>
                                                </td>


                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* ------------------- content ---------------- */}

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* ------------------- Modals---------------- */}
            {/* ------------------- Modals---------------- */}
            <dialog id="my_modal_6" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Rejected</h3>

                    {/* ------------------- content ---------------- */}
                    <div className='w-full px-5 mt-10 rounded'>
                        <div className="overflow-x-auto">
                            <div>
                                <table className="table font-semibold">
                                    <thead>
                                        <tr className="bg-primary-500 text-green-800">
                                            <th className="border border-primary-300 px-4 py-2">Date</th>
                                            <th className="border border-primary-300 px-4 py-2">Product Name</th>
                                            <th className="border border-primary-300 px-4 py-2">Quantity</th>
                                            <th className="border border-primary-300 px-4 py-2">Price</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rejectData.map(da => (
                                            <tr key={da._id} className="bg-base-200">
                                                <td className="border border-primary-300 px-4 py-2">{new Date(da.date).toLocaleDateString()}</td>
                                                <td className="border border-primary-300 px-4 py-2">{da.productName}</td>
                                                <td className="border border-primary-300 px-4 py-2">{da.quantity}</td>

                                                <td className="border border-primary-300 px-4 py-2">{da.price}</td>



                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* ------------------- content ---------------- */}

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* ------------------- Modals---------------- */}
            {/* ------------------- Modals---------------- */}
            <dialog id="my_modal_5" className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg">Accepted</h3>

                    {/* ------------------- content ---------------- */}
                    <div className='w-full px-5 mt-10 rounded'>
                        <div className="overflow-x-auto">
                            <div>
                                <table className="table font-semibold">
                                    <thead>
                                        <tr className="bg-primary-500 text-green-800">
                                            <th className="border border-primary-300 px-4 py-2">Date</th>
                                            <th className="border border-primary-300 px-4 py-2">Product Name</th>
                                            <th className="border border-primary-300 px-4 py-2">Quantity</th>

                                            <th className="border border-primary-300 px-4 py-2">Price</th>

                                   
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {acceptData.map(da => (
                                            <tr key={da._id} className="bg-base-200">
                                                <td className="border border-primary-300 px-4 py-2">{new Date(da.date).toLocaleDateString()}</td>
                                                <td className="border border-primary-300 px-4 py-2">{da.productName}</td>
                                                <td className="border border-primary-300 px-4 py-2">{da.quantity}</td>

                                                <td className="border border-primary-300 px-4 py-2">{da.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* ------------------- content ---------------- */}

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            {/* ------------------- Modals---------------- */}

        </div>


    );
};

export default RequisitionInAdmin;




