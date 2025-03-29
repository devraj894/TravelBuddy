import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const GuideProfile = () => {
    const { id } = useParams();

    const { data: guide, isLoading, isError } = useQuery({
        queryKey: ['guideProfile', id],
        queryFn: async () => {
            const res = await axios.get(`https://assignment-12-server-beryl.vercel.app/guides/${id}`);
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if (isError || !guide) {
        return <div className="min-h-screen flex items-center justify-center">
            <p className="text-red-500">Failed to load guide details.</p>
        </div>;
    }

    return (
        <div className="min-h-screen bg-base-200 pt-20 p-5">
            <div className="bg-white shadow-md rounded-lg p-5 mb-10 max-w-3xl mx-auto">
                <div className="flex items-center gap-5">
                    <img
                        src={guide.photo || 'https://via.placeholder.com/150'}
                        alt={guide.name}
                        className="w-24 h-24 rounded-full"
                    />
                    <div>
                        <h2 className="text-2xl font-bold">{guide.name}</h2>
                        <p className="text-gray-600">{guide.experience || 0} years of experience</p>
                        <p className="text-gray-600">Specialized in: {guide.specialization || 'N/A'}</p>
                        <p className="text-gray-600">Contact: {guide.email}</p>
                    </div>
                </div>
            </div>

            {/* Stories Section */}
            <div className="max-w-4xl mx-auto">
                <h3 className="text-3xl font-bold mb-5">Stories Added by {guide.name}</h3>
                {guide.stories?.length > 0 ? (
                    guide.stories.map((story) => (
                        <div
                            key={story._id}
                            className="p-4 bg-gray-100 rounded shadow-md"
                        >
                            <img
                                className="w-full h-40 object-cover rounded"
                                src={story.image?.[0] || 'https://via.placeholder.com/150'}
                                alt={story.title}
                            />
                            <h4 className="text-lg font-bold mt-2">{story.title}</h4>
                            <p className="text-gray-600 mt-1">{story.description.slice(0, 100)}...</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No stories added yet.</p>
                )}
            </div>
        </div>
    );
};

export default GuideProfile;
