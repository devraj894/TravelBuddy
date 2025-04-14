import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FacebookIcon, FacebookShareButton } from 'react-share';

const Community = () => {
    const [stories, setStories] = useState([]);
    const [expandedStories, setExpandedStories] = useState({});
    useEffect(() => {
        axios.get('https://assignment-12-server-beryl.vercel.app/stories')
            .then((res) => {
                setStories(res.data);
            })
            .catch(error => {
                console.log('error fetching stories', error);
            })
    }, [])

    const toggleStoryExpansion = (id) => {
        setExpandedStories((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    return (
        <div className="min-h-screen p-5 md:p-10 pt-20 md:pt-24">
            <h2 className="text-4xl font-bold text-center mb-5 dark:text-white">All Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stories.map((story) => (
                    <div key={story._id} className="bg-white rounded shadow-md pb-3 overflow-hidden text-black">
                        <img
                            src={story.images[0] || 'https://via.placeholder.com/150'}
                            alt={story.title}
                            className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                            <div className=''>
                                <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                                <p className="text-gray-600 mt-2">
                                    {expandedStories[story._id]
                                        ? story.description
                                        : `${story.description.slice(0, 100)}...`}
                                    <button
                                        onClick={() => toggleStoryExpansion(story._id)}
                                        className="text-blue-600 hover:underline mt-2"
                                    >
                                        {expandedStories[story._id] ? 'Read Less' : 'Read More'}
                                    </button>
                                </p>
                            </div>

                        </div>
                        <div className='px-5 flex items-center gap-5'>
                            <h4>Share with your friends:</h4>
                            <FacebookShareButton
                                url={window.location.href}
                                quote={`Check out this amazing story: ${story.title}`}
                                onClick={() => handleShare(window.location.href)}
                            >
                                <FacebookIcon size={32} round></FacebookIcon>
                            </FacebookShareButton>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Community;