import React, { useState } from 'react';
import Swal from 'sweetalert2';

const AddDoctors = () => {
    const [doctorInfo, setDoctorInfo] = useState({
        name: '',
        specialty: '',
        email: '',
        description: '', // Added description field
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctorInfo({
          ...doctorInfo,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to add this doctor?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it!",
          });
    
          if (result.isConfirmed) {
            const response = await fetch('https://hospital-managment-server.vercel.app/addDoctor', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(doctorInfo),
            });
    
            if (response.ok) {
              await Swal.fire({
                title: "Doctor Added!",
                text: "Doctor has been added successfully.",
                icon: "success",
              });
              setDoctorInfo({
                name: '',
                specialty: '',
                email: '',
                description: '', 
              });
            } else {
              await Swal.fire({
                title: "Error",
                text: "Failed to add doctor.",
                icon: "error",
              });
            }
          }
        } catch (error) {
          console.error('Error:', error);
          await Swal.fire({
            title: "Error",
            text: "An error occurred while adding the doctor.",
            icon: "error",
          });
        }
      };
    


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={doctorInfo.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Specialty:</label>
            <input
              type="text"
              name="specialty"
              value={doctorInfo.specialty}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={doctorInfo.email}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Description:</label>
            <textarea
              name="description"
              value={doctorInfo.description}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full h-32 resize-none focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Add Doctor
          </button>
        </form>
      </div>
    );
};

export default AddDoctors;