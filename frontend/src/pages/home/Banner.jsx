import React from 'react';
import bannerImage from '../../assets/backgroundImage.jpg';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div
            className="hero"
            style={{
                backgroundImage: `url(${bannerImage})`,
                height: '80vh'
            }}>
            <div className="hero-overlay bg-opacity-25"></div>
            <div className="hero-content text-white text-center">
                <div className="">
                    <h1 className="mb-2 lg:mb-5 text-4xl md:text-5xl lg:text-6xl font-bold">Discover the Wonders of India</h1>
                    <p className="mb-2 lg:mb-8">
                    Explore the beautiful landscapes and unique attractions of India with our travel guide.
                    </p>
                    <button onClick={() => navigate('/allTrips')} className="btn btn-sm rounded-md hover:bg-sky-900 font-normal lg:btn-md lg:text-base border-0 bg-sky-800 text-white">Get Started <FaArrowRight></FaArrowRight></button>
                </div>
            </div>
        </div>
    );
};

export default Banner;