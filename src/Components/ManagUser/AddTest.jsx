import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddTest = () => {
    const [testName, setTestName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (testName && price && description) {
            try {
                const response = await fetch('https://hospital-managment-server.vercel.app/addTest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        testName,
                        price,
                        description,
                    }),
                });

                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Test Added!',
                        text: `Test Name: ${testName}, Price: ${price}, Description: ${description}`,
                    });

                    setTestName('');
                    setPrice('');
                    setDescription('');
                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Failed to add test. Please try again later.',
                    });
                }
            } catch (error) {

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Failed to connect to the server. Please try again later.',
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!',
            });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20">
            <h1 className='text-3xl font-semibold'>Add Test</h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="testName">
                        Test Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="testName"
                        type="text"
                        placeholder="Enter test name"
                        value={testName}
                        onChange={(e) => setTestName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="text"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Test
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTest;