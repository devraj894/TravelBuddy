import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import 'react-tabs/style/react-tabs.css';
import { TbCurrencyTaka } from 'react-icons/tb';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { motion } from 'framer-motion';

const TourismAndGuide = () => {
    const [randomPackages, setRandomPackages] = useState([]);
    const [randomGuides, setRandomGuides] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        axios.get('https://assignment-12-server-beryl.vercel.app/packages/random')
            .then(res => {
                setRandomPackages(res.data);
            })
            .catch(error => {
                console.log('error fetching random packages', error);
            })
    }, [])

    useEffect(() => {
        axios.get('https://assignment-12-server-beryl.vercel.app/guides/random')
            .then((res) => {
                setRandomGuides(res.data);
            })
            .catch((error) => {
                console.error('Error fetching random guides:', error);
            });
    }, []);



    return (
        <div className='text-center my-16'>
            <h2 className='text-4xl font-semibold mb-6'>Tourism and Travel Guides</h2>
            <Tabs>
                <TabList>
                    <Tab>Our Packages</Tab>
                    <Tab>Meet Our Tour Guides</Tab>
                </TabList>

                <TabPanel>
                    <motion.div
                        className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 px-8'
                        initial={{ x: '100%' }}  // Start from right outside the screen
                        animate={{ x: 0 }}  // Slide into place
                        transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
                    >
                        {
                            randomPackages.map((pkg, index) => (
                                <div key={pkg._id} className='bg-white rounded shadow-md overflow-hidden'>
                                    <motion.div
                                        key={pkg._id}
                                        className='p-5'
                                        whileHover={{ scale: 1.05 }}  // Hover effect to enlarge the card slightly
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <img className='rounded-md h-[200px] w-full' src={pkg.coverImage} alt="" />
                                        <div className='mt-4 flex flex-col justify-between'>
                                            <div className='md:h-32 mb-5'>
                                                <h2 className='text-2xl font-semibold mb-2 text-start dark:text-black'>{pkg.title}</h2>
                                                <p className='text-start text-gray-500 mb-2'>{pkg.description}</p>
                                                <p className='flex items-center text-sky-800 font-medium text-xl'><TbCurrencyTaka></TbCurrencyTaka> {pkg.price}</p>
                                            </div>
                                            <div className='flex justify-between items-center mt-5'>
                                                <p className='border px-2 rounded-sm bg-sky-600 bg-blue-700 text-white'>{pkg.tourType}</p>         
                                                <button onClick={() => navigate(`/packageDetails/${pkg._id}`)} className='flex items-center gap-2 py-1 px-3 text-blue-700'>View Details<FaArrowUpRightFromSquare /></button>
                                            </div>

                                        </div>
                                    </motion.div>
                                </div>
                            ))
                        }
                    </motion.div>

                </TabPanel>

                <TabPanel>
                    <motion.div
                        className='grid grid-cols-1 md:grid-cols-3 gap-4 rounded-md px-3 md:px-8'
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
                    >

                        {randomGuides.map((guide, index) => (
                            <div key={guide._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                                <motion.div
                                    key={guide._id}
                                    className="bg-white shadow-md rounded-lg overflow-hidden"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <img
                                        src={guide.photo}
                                        alt={guide.name}
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold mb-2">{guide.name}</h3>
                                        <p className="text-gray-600 mb-2">Email: {guide.email}</p>
                                        <button
                                            onClick={() => navigate(`/guideProfile/${guide._id}`)}
                                            className="mt-4 py-2 px-4 bg-green-600 text-white rounded dark:text-black hover:bg-green-700 "
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        ))}

                    </motion.div>
                </TabPanel>
            </Tabs>
        </div >
    );
};

export default TourismAndGuide;