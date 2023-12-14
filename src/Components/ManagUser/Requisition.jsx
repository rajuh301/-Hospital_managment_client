import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../provider/AuthProvider';
import { Link } from 'react-router-dom';


const Requisition = () => {
    const { user } = useContext(AuthContext)
    let email = user?.email;

    const [formData, setFormData] = useState({
        productName: '',
        quantity: '',
        description: '',
        price: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, email

        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://hospital-managment-server.vercel.app/requisition', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Success case - show SweetAlert
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Data sent successfully.',
                });

                // Reset the form data
                setFormData({
                    productName: '',
                    quantity: '',
                    description: '',
                    price: '',
                });
            } else {
                // If the server responds with an error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            }
        } catch (error) {
            // Catch any network-related errors
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Network error occurred!',
            });
        }
    };



    return (
        <div>

            <div className="flex justify-center md:mt-20">
                <div className="border shadow-md w-80 p-6 rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                                Request Product Name
                            </label>
                            <input
                                required
                                type="text"
                                id="productName"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-2 border shadow"
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                                Quantity
                            </label>
                            <input
                                required
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-2 border shadow"
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                required
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-2 border shadow"
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea

                                id="description"
                                name="description"
                                rows="3"
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-2 border shadow"
                            ></textarea>
                        </div>

                        <div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                                Submit
                            </button>
                        </div>
                    </form>

                    <div className=''>

                        <Link to='/showRequisition' className='font-extrabold hover:text-green-600'>Track Status</Link>


                    </div>
                </div>
            </div>


        </div>
    );
};

export default Requisition;