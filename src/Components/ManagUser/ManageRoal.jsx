import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';



const ManageRoal = () => {

    const [datas, setDatas] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setDatas(data))
    }, [])


    // ------------------------- Raal Update -------------------
    const handleRoleChange = (userId, newRole) => {
        console.log(userId)
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you want to change the role to ${newRole} for this user?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, change it!',
        }).then(result => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/users/${userId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ roal: newRole }),
                })
                    .then(response => {
                        if (response.ok) {

                            Swal.fire('Role Updated!', '', 'success');
                            window.location.reload();
                        } else {

                            Swal.fire('Error', 'Failed to update role', 'error');
                        }
                    })
                    .catch(error => {

                        Swal.fire('Error', 'Failed to update role', 'error');
                    });
            }
        });
    };
    // ------------------------- Raal Update -------------------



    const allUser = datas?.map(user => (
        <div className='flex justify-between shadow border mx-7 mt-3' key={user.id}>
            <td className='w-52'>Name: {user.name}</td>
            <td className='w-72'>Email: {user.email}</td>
            <td className='w-72'>Role: {user.roal}</td>

            <td>
                <form
                    className='flex gap-5'
                    onSubmit={e => {
                        e.preventDefault();
                        const selectedRole = e.target.querySelector('select').value;
                        handleRoleChange(user._id, selectedRole);
                    }}
                >
                    <p>Select Role:</p>
                    <select>
                        <option disabled selected>Pick one</option>
                        <option>user</option>
                        <option>register</option>
                        <option>doctor</option>
                        <option>pharmacy</option>
                        <option>admin</option>
                        <option>pathology</option>
                    </select>
                    <button type="submit">Update</button>
                </form>
            </td>
        </div>
    ));

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    {/* <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Select Roal</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {/* row 1 */}
                        <tr className="bg-base-200">

                            {allUser}

                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRoal; <p>User</p>