import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import { FaClipboardList, FaHome, FaUserEdit, FaUsers } from 'react-icons/fa';
import { LuTickets } from 'react-icons/lu';
import { FaPencil, FaUsersGear } from 'react-icons/fa6';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdLocalOffer } from 'react-icons/md';
import useAdmin from '../hooks/useAdmin';
import useTourGuide from '../hooks/useTourGuide';
import { TbBrandStorybook } from 'react-icons/tb';


const DashboardLayout = () => {

    const [isAdmin] = useAdmin();
    const [isTourGuide] = useTourGuide();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const touristLinks = <>
        <li><NavLink to='/dashboard/manageProfile' className="flex items-center gap-2"><FaUserEdit /> Manage Profile</NavLink></li>
        <li><NavLink to='/dashboard/my-bookings' className="flex items-center gap-2"><LuTickets /> My Bookings</NavLink></li>
        <li><NavLink to='/dashboard/add-stories' className="flex items-center gap-2"><FaPencil /> Add Stories</NavLink></li>
        <li><NavLink to='/dashboard/manage-stories' className="flex items-center gap-2"><FaClipboardList /> Manage Stories</NavLink></li>
        <li><NavLink to='/dashboard/tourGuideApplication' className="flex items-center gap-2"><AiOutlineUserAdd /> Join as Tour Guide</NavLink></li>
    </>

    const adminLinks = <>
        <li><NavLink to='/dashboard/manageProfile' className="flex items-center gap-2"><FaUserEdit /> Manage Profile</NavLink></li>
        <li><NavLink to='/dashboard/add-package' className="flex items-center gap-2"><MdLocalOffer />Add Package</NavLink></li>
        <li><NavLink to='/dashboard/manage-users' className="flex items-center gap-2"><FaUsers /> Manage Users</NavLink></li>
        <li><NavLink to='/dashboard/manage-candidates' className="flex items-center gap-2"><FaUsersGear /> Manage Candidates</NavLink></li>
        <li><NavLink to='/dashboard/my-assigned-tour' className="flex items-center gap-2"><LuTickets /> My Assigned Tour</NavLink></li>
        <li><NavLink to='/dashboard/add-stories' className="flex items-center gap-2"><FaPencil /> Add Stories</NavLink></li>
        <li><NavLink to='/dashboard/manage-stories' className="flex items-center gap-2"><FaClipboardList /> Manage Stories</NavLink></li>
    </>

    const guideLinks = <>
        <li><NavLink to='/dashboard/manageProfile' className="flex items-center gap-2"><FaUserEdit /> Manage Profile</NavLink></li>
        <li><NavLink to='/dashboard/my-assigned-tour' className="flex items-center gap-2"><LuTickets /> My Assigned Tour</NavLink></li>
        <li><NavLink to='/dashboard/add-stories' className="flex items-center gap-2"><FaPencil /> Add Stories</NavLink></li>
        <li><NavLink to='/dashboard/manage-stories' className="flex items-center gap-2"><FaClipboardList /> Manage Stories</NavLink></li>
    </>


    return (
        <div className='md:flex'>
            {/* sidebar for larger device */}
            <div className={`w-64 min-h-screen p-2 md:p-5 bg-sky-800 text-white hidden md:block`}>
                <ul className="space-y-2 mb-10">
                    {
                        isAdmin ? adminLinks : isTourGuide ? guideLinks : touristLinks
                    }
                </ul>
                <hr />
                <ul className='mt-10 space-y-2'>
                    <li><NavLink to='/' className="flex items-center gap-2"><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to='/allTrips' className="flex items-center gap-2"><MdLocalOffer /> All Trips</NavLink></li>
                    <li><NavLink to='/allStories' className="flex items-center gap-2"><TbBrandStorybook /> Community</NavLink></li>
                </ul>
            </div>

            {/* Sidebar content for small screens */}
            <div className={`fixed inset-y-0 left-0 w-52 bg-sky-800 text-white p-5 z-30 transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <button
                    onClick={toggleSidebar}
                    className="text-white text-2xl absolute top-4 right-4"
                >
                    &times; {/* Close icon */}
                </button>
                <ul className="space-y-2 mt-12">
                    {
                         isAdmin ? adminLinks : isTourGuide ? guideLinks : touristLinks
                    }
                </ul>
                <hr />
                <ul className='mt-10 space-y-2'>
                    <li><NavLink to='/' className="flex items-center gap-2"><FaHome></FaHome> Home</NavLink></li>
                    <li><NavLink to='/allTrips' className="flex items-center gap-2"><MdLocalOffer /> All Trips</NavLink></li>
                    <li><NavLink to='/allStories' className="flex items-center gap-2"><TbBrandStorybook /> Community</NavLink></li>
                </ul>
            </div>

            {/* Sidebar toggle (Hamburger) icon for small screens */}
            <div className="md:hidden p-4 sticky top-0" onClick={toggleSidebar}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
            </div>


            <div className='flex flex-col w-full dark:bg-gray-800'>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>

        </div>
    );
};

export default DashboardLayout;