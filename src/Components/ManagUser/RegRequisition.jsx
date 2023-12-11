import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const RegRequisition = () => {
    const { user } = useContext(AuthContext)
    const [requisition, setRequisition] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:5000/requisition')
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


    const acceptData = requisition?.filter(da => da.status === 'accepted')
    // ---------------------------------------- Account Section ------------------------
    const [datas, setDatas] = useState([]);
    const [total, setTotal] = useState(0);


    useEffect(() => {
        fetch('http://localhost:5000/pasent')
            .then((res) => res.json())
            .then((data) => setDatas(data));
    }, []);



    let sum = datas
        .flatMap(data => data.charge)
        .map(charge => parseInt(charge))
        .filter(value => !isNaN(value))
        .reduce((acc, val) => acc + val, 0);

    // ------------------------------- Cash Section--------------------


    // --------------------------- add test charge ------------------------
    const [testMany, setTestMany] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/testCharge')
            .then((res) => res.json())
            .then((data) => setTestMany(data));
    }, []);


    let sumTest = testMany
        .map(da => parseInt(da.charge))
        .filter(value => !isNaN(value))
        .reduce((acc, val) => acc + val, 0);


    // --------------------------- add test charge ------------------------


    const [cashData, setCashData] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/cashout')
            .then((res) => res.json())
            .then((data) => setCashData(data));
    }, []);

    const lastOut = cashData[cashData.length - 1];


    const sum2 = cashData
        .map((item) => {
            const parsedValue = parseFloat(item.inputText);
            return isNaN(parsedValue) ? 0 : parsedValue;
        })
        .reduce((acc, val) => acc + val, 0);


    const showData = sum - sum2

    const showDataUpdate = showData + sumTest


    // ---------------------------------------- Account Section ------------------------


    // ------------------ Account Function ----------------


    const handleCash = (price, _id) => {
        const empoloyEmail = user?.email;
        const employName = user?.displayName;

        const url = 'http://localhost:5000/cashout';

        const dataToSend = {
            empoloyEmail: empoloyEmail,
            employName: employName,
            inputText: price,
        };

        Swal.fire({
            title: 'Sending data...',
            text: 'Please wait.',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            },
        });

        if (showDataUpdate < price) {

            Swal.close();

            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Insufficient balance.',
            });
            return
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then((data) => {
                Swal.close();

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Data sent successfully.',
                });

                console.log('Data sent successfully:', data);
            })
            .catch((error) => {

                Swal.close();

                Swal.fire({
                    icon: 'error',
                    title: 'Error!',
                    text: 'There was a problem sending the data.',
                });

                console.error('There was a problem sending the data:', error);
            });



        // ----------------- more ------
        const data = {
            status: 'done',
        };

        fetch(`http://localhost:5000/requisition/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        // ----------------- more ------
    };

    // ------------------ Account Function ----------------

    return (
        <div>
            <div className='flex m-10'>

                <div className='w-40 border h-20 rounded bg-pink-500 text-2xl text-center m-10 hover:bg-green-600 text-white'>
                    <button className="" onClick={() => document.getElementById('my_modal_5').showModal()}>Accepted
                        <p className='boder  bg-yellow-600 p-1 rounded text-white'>{acceptData?.length}</p>
                    </button>
                </div>
            </div>
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
                                        <tr className="bg-primary-500 text-green-800 text-center">
                                            <th className="border border-primary-300 px-4 py-2">Date</th>
                                            <th className="border border-primary-300 px-4 py-2">Product Name</th>

                                            <th className="border border-primary-300 px-4 py-2">Quantity</th>
                                            <th className="border border-primary-300 px-4 py-2">Price</th>

                                            <th className="border border-primary-300 px-4 py-2">Cash Out</th>


                                        </tr>
                                    </thead>
                                    <tbody>
                                        {acceptData.map(da => (
                                            <tr key={da._id} className="bg-base-200 text-center">
                                                <td className="border border-primary-300 px-4 py-2">{new Date(da.date).toLocaleDateString()}</td>
                                                <td className="border border-primary-300 px-4 py-2">{da.productName}</td>

                                                <td className="border border-primary-300 px-4 py-2">{da.quantity}</td>

                                                <td className="border border-primary-300 px-4 py-2">{da.price}</td>


                                                <td className="border border-primary-300 px-4 py-2">

                                                    <button onClick={() => handleCash(da.price, da._id)} className='border px-5 rounded shadow bg-pink-400 hover:bg-green-500'>Cash</button>

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
        </div>
    );
};

export default RegRequisition;