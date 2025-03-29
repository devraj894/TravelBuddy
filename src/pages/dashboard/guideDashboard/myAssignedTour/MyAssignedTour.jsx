import React, { useState } from 'react';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyAssignedTour = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(false);

    const { data: assignedTours = [], refetch } = useQuery({
        queryKey: ['assignedTours', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assigned-tours?guideEmail=${user?.email}`);
            return res.data;
        }
    });

    const handleAccept = (id) => {
        setLoading(true);
        axiosSecure.patch(`/assigned-tours/accept/${id}`)
        .then(res => {
            if(res.status === 200){
                Swal.fire({
                    title: 'Success',
                    text: 'Tour accepted successfully',
                    icon: 'success'
                })
                refetch();
            }
        })
        .catch(error => {
            console.log(error.message);
        })
        
    }

    const handleReject = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won’t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, reject it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const response = await axiosSecure.patch(`/assigned-tours/reject/${id}`);
                    if (response.status === 200) {
                        Swal.fire('Rejected', 'Tour rejected successfully.', 'success');
                        refetch();
                    }
                } catch (error) {
                    Swal.fire('Error', error.response?.data?.message || 'Failed to reject the tour.', 'error');
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    if (!user) {
        return <p>You need to log in to view your assigned tours.</p>;
    }

    return (
        <div className='min-h-screen p-5 dark:text-white'>
            <h2 className='text-4xl font-semibold mb-5'>My Assigned Tour</h2>
            <div className="overflow-x-auto">
                <table className="table border border-collapse dark:text-white">
                    {/* head */}
                    <thead>
                        <tr className='bg-sky-100'>
                            <th className='border border-gray-300'></th>
                            <th className='border border-gray-300'>Package Name</th>
                            <th className='border border-gray-300'>Tourist Name</th>
                            <th className='border border-gray-300'>Tour Date</th>
                            <th className='border border-gray-300'>Price</th>
                            <th className='border border-gray-300'>Status</th>
                            <th className='border border-gray-300'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            assignedTours.map((tour, index) => (
                                <tr key={tour._id}>
                                    <th className='border border-gray-300'>{index + 1}</th>
                                    <td className='border border-gray-300'>{tour.packageName}</td>
                                    <td className='border border-gray-300'>{tour.touristName}</td>
                                    <td className='border border-gray-300'>{tour.tourDate}</td>
                                    <td className='border border-gray-300'>{tour.price} BDT</td>
                                    <td className={`border border-gray-300 p-2 capitalize ${tour.status === 'pending' ? 'text-yellow-500' : ''}`}>
                                        {tour.status}
                                    </td>
                                    <td className="border border-gray-300 p-2">
                                    <button
                                        onClick={() => handleAccept(tour._id)}
                                        disabled={tour.status !== 'In Review'}
                                        className={`bg-green-500 text-white px-3 py-1 rounded ${
                                            tour.status !== 'In Review' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                                        }`}
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleReject(tour._id)}
                                        className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Reject
                                    </button>
                                </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAssignedTour;