import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllTrips = () => {
    const axiosPublic = useAxiosPublic();
    const [sortType, setSortType] = useState('');


    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosPublic.get('/packages');
            console.log(res.data);
            return res.data;
        }
    })
    if (isLoading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    const sortedPackages = [...packages].sort((a, b) => {
        if (sortType === 'price-asc') return a.price - b.price;
        if (sortType === 'price-desc') return b.price - a.price;
        if (sortType === 'title-asc') return a.title.localeCompare(b.title);
        if (sortType === 'title-desc') return b.title.localeCompare(a.title);
        return 0; // Default, no sorting
    });

    return (
        <div className='min-h-screen pt-20 pb-10 px-3 md:px-10'>
            <h2 className='text-4xl text-center font-bold'>All Trips</h2>

            <div className='flex justify-end my-4 text-white'>
                <select 
                    className='border border-gray-300 p-2 rounded-sm bg-base-200' 
                    onChange={(e) => setSortType(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price, Low to High</option>
                    <option value="price-desc">Price, High to Low</option>
                    <option value="title-asc">Alphabetically, A-Z</option>
                    <option value="title-desc">Alphabetically, Z-A</option>
                </select>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
                {
                    sortedPackages.map((pkg) => (
                        <div key={pkg._id} className='p-3 flex flex-col md:flex-row justify-between gap-3 bg-white rounded shadow-md overflow-hidden text-black'>
                            <img className='w-2/5' src={pkg.coverImage} alt="" />
                            <div>
                                <h3 className='text-2xl my-4'>{pkg.title}</h3>
                                <p className='text-gray-600'>{pkg.description}</p>
                                <div className='flex items-center justify-between mt-3'>
                                    <p className='flex items-center gap-1'><TbCurrencyTaka />{pkg.price}</p>
                                    <NavLink to={`/packageDetails/${pkg._id}`}><button className='border border-sky-800 rounded-sm px-2 text-sky-600 mr-5'>Details</button></NavLink>
                                </div>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllTrips;