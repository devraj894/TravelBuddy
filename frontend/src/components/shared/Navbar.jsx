import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FaUser } from 'react-icons/fa';
import ThemeToggle from '../ThemeToggle';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allTrips'>All Trips</NavLink></li>
        <li><NavLink to='/allStories'>Community</NavLink></li>
        <li><NavLink to='/about'>About Us</NavLink></li>
    </>

    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const isHomePage = location.pathname === '/';

    const handleLogout = () => {
        logout()
            .then(() => console.log('logged out user'))
            .catch(error => console.log(error))
    }

    return (
        <div className={`navbar px-3  md:px-5 lg:px-10 fixed top-0 z-50 ${isScrolled || !isHomePage ? 'bg-sky-800' : 'bg-transparent'} `}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className=" dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <a className="text-xl text-white">TravelBuddy</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-8 px-1 text-white">
                    {links}
                </ul>
            </div>
            <div className="navbar-end flex gap-3">
                <ThemeToggle></ThemeToggle>
                {
                    user ? (
                        <div className="dropdown dropdown-end text-white">
                            <div tabIndex={0} className="flex items-center gap-3 cursor-pointer">
                                <img
                                    src={user.photoURL || <FaUser></FaUser>}
                                    title={user.displayName || 'User'}
                                    className="w-10 h-10 rounded-full"
                                />
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu rounded-box w-56 mt-1 p-2 shadow-lg"
                            >
                                <li>
                                    <p>
                                        <strong className='flex items-center gap-1'><FaUser></FaUser> {user.displayName || 'User'}</strong>
                                    </p>
                                    <p>
                                        <span className="text-xs">{user.email || 'No email'}</span>
                                    </p>
                                </li>
                                <li><Link to="/dashboard/manageProfile">Profile</Link></li>
                                <li><Link to="/dashboard/manageProfile">Dashboard</Link></li>
                                <li><Link to="/offers">Offer Announcements</Link></li>
                                <li>
                                    <button onClick={handleLogout} className="btn btn-outline btn-sm">Logout</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className='flex items-center gap-3'>
                            
                            <button className='py-1 px-4 border rounded-md hover:bg-sky-800 text-white'><Link to='/login'>Login</Link></button>
                            <button className='hover:bg-sky-800 py-1 px-4 text-white border rounded-md'><Link to='/register'>Register</Link></button>
                        </div>
                    )
                }
            </div >
        </div >
    );
};

export default Navbar;