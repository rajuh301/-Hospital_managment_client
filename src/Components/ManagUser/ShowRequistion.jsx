import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';

const ShowRequistion = () => {

    // -----------------Status------------------ 
    const { user } = useContext(AuthContext)
    let email = user?.email;
    const [requisitions, setRequisitions] = useState([])

    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:5000/requisition')
                .then((res) => res.json())
                .then((data) => setRequisitions(data))
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000);
        return () => clearInterval(intervalId);
    }, []);


    const requisitionByEmail = requisitions.filter(da => da.email === email)
    console.log(requisitionByEmail)

    const paindingData = requisitionByEmail?.find(da => da.status === true)
    const acceptData = requisitionByEmail?.find(da => da.status === 'accepted')
    const DoneData = requisitionByEmail?.find(da => da.status === 'done')
    const rejectData = requisitionByEmail?.find(da => da.status === 'reject')


    // -----------------Status------------------ 

    // ------- condition-----------
    // const RequestStatus = () => {
    //     const steps = [];

    //     if (paindingData) {
    //         steps.push(<li key="pending" className="step step-primary">Pending</li>);
    //     }

    //     if (acceptData) {
    //         steps.push(<li key="accepted" className="step step-primary">Accepted</li>);
    //     }

    //     if (DoneData) {
    //         steps.push(<li key="done" className="step step-primary">Done</li>);
    //     }

    //     if (rejectData) {
    //         steps.push(<li key="rejected" className="step">Rejected</li>);
    //     }

    //     return steps.length > 0 ? (
    //         <ul className="steps">
    //             {steps}
    //         </ul>
    //     ) : null;
    // }






    // ------- condition-----------





    return (
        <div className="overflow-x-auto mx-10 mt-5 rounded-lg">
            <table className="min-w-full">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-3 py-3 text-left">Date</th>
                        <th className="px-20 py-3 text-left">Name</th>
                        <th className="px-2 py-3 text-left">Quantity</th>
                        <th className="px-6 py-3 text-left">Price</th>
                        <th className="px-6 py-3 text-left">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requisitionByEmail.slice(-5).map(da => (
                        <tr key={da.id}>
                            <td className="border py-4">
                                {new Date(da.date).toLocaleDateString()} {new Date(da.date).toLocaleTimeString()}
                            </td>
                            <td className="border py-4">{da.productName}</td>
                            <td className="border px-6 py-4">{da.quantity}</td>
                            <td className="border px-6 py-4">{da.price}</td>
                            <td class="border px-6 py-4">
                                {da.status === true ? (
                                    <span>Pending</span>
                                ) : (
                                    <span>{da.status}</span>
                                )}
                            </td>



                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default ShowRequistion;