import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MdMailOutline, MdPhone, MdLocationOn } from 'react-icons/md';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ManageProfile = () => {
    const { user: authUser } = useAuth();
    const [user, setUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedUser, setEditedUser] = useState({
        name: '',
        photo: '',
        phone: '',
        address: '',
    });
    const [adminStats, setAdminStats] = useState(null);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    // ✅ Fetch user data and auto-fill form
    useEffect(() => {
        if (authUser?.email) {
            axios.get(`https://assignment-12-server-beryl.vercel.app/users?email=${authUser.email}`)
                .then(res => {
                    setUser(res.data);

                    // ✅ Only set editedUser when first loading, NOT on re-renders
                    setEditedUser(prev => ({
                        name: prev.name || res.data.name || '',
                        photo: prev.photo || res.data.photo || '',
                        phone: prev.phone || res.data.phone || '',
                        address: prev.address || res.data.address || '',
                    }));

                    if (res.data.role === 'admin') {
                        axiosSecure.get('/admin/stats')
                            .then(res => setAdminStats(res.data))
                            .catch(error => console.error('Failed to fetch admin stats:', error));
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                    navigate('/login');
                });
        }
    }, [authUser?.email, navigate]);


    // ✅ Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({ ...prev, [name]: value }));
    };

    // ✅ Fix update function
    const handleUpdate = () => {
        if (editedUser.name && editedUser.photo) {
            axiosSecure.patch(`/users/profile/${user._id}`, editedUser, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access-token')}`  // ✅ Add token
                }
            })
                .then(() => {
                    console.log('Profile updated successfully in backend');
                    setUser((prev) => ({
                        ...prev,
                        ...editedUser  // ✅ Ensure state updates with new data
                    }));
                    setIsEditModalOpen(false);
                })
                .catch((error) => {
                    console.error('Error updating profile:', error);
                });
        }
    };


    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-5">
            <div className="w-full p-5">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-3 dark:text-white">Welcome, {user.name || 'User'}!</h1>
                    <p className="text-gray-600 dark:text-white">Manage your profile and preferences here.</p>
                </div>


                <div className="flex items-center justify-end gap-4 mt-5">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="py-2 px-4 rounded-md bg-blue-800 hover:bg-blue-900 text-white"
                    >
                        Edit Profile
                    </button>
                </div>

                <div className="p-5 flex items-center gap-10 mt-5 shadow-xl">
                    <img
                        src={user.photo || 'https://via.placeholder.com/100'}
                        alt="User Profile picture"
                        className="w-24 h-24 rounded-full mb-3"
                    />
                    <div>
                        <p className="text-lg font-semibold">{user.name || 'N/A'}</p>
                        <p className="text-gray-500 flex items-center gap-2"><MdMailOutline /> {user.email || 'N/A'}</p>
                        <p className="text-gray-500 flex items-center gap-2"><MdPhone /> {user.phone || 'N/A'}</p>
                        <p className="text-gray-500 flex items-center gap-2"><MdLocationOn /> {user.address || 'N/A'}</p>
                        <p className="text-gray-500 mt-2">Role: {user.role || 'Tourist'}</p>
                    </div>
                </div>


                {user.role === 'admin' && adminStats && (
                    <div className="mt-10 bg-white p-5 rounded shadow-md">
                        <h2 className="text-2xl font-bold mb-5">Admin Statistics</h2>
                        <ul className="list-disc list-inside">
                            <li>Total Payment: <strong>{adminStats.totalPayment.toFixed(2)} BDT</strong></li>
                            <li>Total Tour Guides: <strong>{adminStats.totalTourGuides}</strong></li>
                            <li>Total Packages: <strong>{adminStats.totalPackages}</strong></li>
                            <li>Total Clients: <strong>{adminStats.totalClients}</strong></li>
                            <li>Total Stories: <strong>{adminStats.totalStories}</strong></li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="modal modal-open text-white">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Edit Profile</h3>
                        <div className="form-control mt-3">
                            <label className="label">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editedUser.name}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">Profile Photo URL</label>
                            <input
                                type="text"
                                name="photo"
                                value={editedUser.photo}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={editedUser.phone}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control mt-3">
                            <label className="label">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={editedUser.address}
                                onChange={handleInputChange}
                                className="input input-bordered"
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-5">
                            <button onClick={() => setIsEditModalOpen(false)} className="btn btn-sm bg-red-600 hover:bg-red-700 text-white">
                                Cancel
                            </button>
                            <button onClick={handleUpdate} className="btn btn-sm bg-green-600 hover:bg-green-500 text-white">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageProfile;