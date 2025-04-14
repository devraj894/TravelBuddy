import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Select from 'react-select';
import Swal from 'sweetalert2';


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [selectedRole, setSelectedRole] = useState(null);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', { searchName, searchEmail, selectedRole }],
        queryFn: async () => {
            const params = {};
            if (searchName) params.name = searchName;
            if (searchEmail) params.email = searchEmail;
            if (selectedRole) params.role = selectedRole.value;

            const res = await axiosSecure.get('/users', { params });
            return res.data;
        }
    })

    const roles = [
        { value: 'tourist', label: 'Tourist' },
        { value: 'tour-guide', label: 'Tour Guide' },
        { value: 'admin', label: 'Admin' },
    ];

    const handleResetFilters = () => {
        setSearchName('');
        setSearchEmail('');
        setSelectedRole(null);
        refetch(); 
    };

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Made ${user.name} admin.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }
    return (
        <div className='min-h-screen p-5 lg:p-10 dark:text-white'>
            <h3 className='text-4xl text-center font-bold mb-8 dark:text-white'>Manage Users</h3>
            <h3 className='text-2xl mb-4'>Total Users: {users.length}</h3>
            <div className="grid grid-cols-2  lg:grid-cols-4 gap-4 mb-6">
                <div>
                    <label className="block font-medium mb-2">Search by Name</label>
                    <input
                        type="text"
                        className="input input-sm md:input lg:input-sm input-bordered"
                        placeholder="Enter name"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Search by Email</label>
                    <input
                        type="text"
                        className="input input-sm md:input lg:input-sm input-bordered"
                        placeholder="Enter email"
                        value={searchEmail}
                        onChange={(e) => setSearchEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block font-medium mb-2">Filter by Role</label>
                    <Select
                        options={roles}
                        value={selectedRole}
                        onChange={setSelectedRole}
                        placeholder="Select role"
                        className='dark:text-black'
                    />
                </div>
                <div className='mt-8'>
                    <button className="px-5 py-2 rounded-md bg-sky-800 text-white" onClick={handleResetFilters}>
                        Show All
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto border">
                <table className="table">
                    <thead className='bg-sky-100'>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ? <button className='btn'>Admin</button>: <button
                                    onClick={() => handleMakeAdmin(user)}
                                     className='btn'>{user.role}</button>}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;