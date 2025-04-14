import React from 'react';
import Banner from './Banner';
import TourismAndGuide from './TourismAndGuide/TourismAndGuide';
import TouristStory from './TouristStory/TouristStory';
import PopularDestinations from './PopularDestination/PopularDestination';
import Newsletter from './NewsletterSection/NewsletterSection';
import Testimonials from './TestimonialSection/TestimonialSection';

const HomePage = () => {
    return (
        <div className='text-black dark:text-white'>
            <Banner></Banner>
            <TourismAndGuide></TourismAndGuide>
            <TouristStory></TouristStory>
            <PopularDestinations></PopularDestinations>
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
        </div>
    );
};

export default HomePage;