import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useState } from "react";
import StoryEditModal from "./StoryEditModal";


const ManageStories = () => {
    const { user } = useAuth();
    const [selectedStory, setSelectedStory] = useState(null);

    const { data: stories , isLoading, refetch } = useQuery({
        queryKey: ['stories', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://assignment-12-server-beryl.vercel.app/stories?email=${user.email}`);
            return res.data;
        },
    });

    const handleEditStory = async (updatedData) => {
        try {
            await axios.patch(`https://assignment-12-server-beryl.vercel.app/stories/${selectedStory._id}`, updatedData);
            setSelectedStory(null);
            refetch(); 
            Swal.fire("Success", "Story updated successfully", "success");
        } catch (error) {
            console.error("Error updating story:", error);
            Swal.fire("Error", "Failed to update story", "error");
        }
    }

    const handleDelete = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://assignment-12-server-beryl.vercel.app/stories/${id}`)
                    .then(res => {
                        refetch();
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });

    }

    if (isLoading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    return (
        <div className="min-h-screen p-5">
            <h2 className="text-3xl font-bold text-center mb-5 dark:text-white">Manage Your Stories</h2>
            {stories.length === 0 ? (
                <p className="text-center">You have no stories yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {stories.map((story) => (
                        <div key={story._id} className="card bg-white shadow-md p-5">
                            <h3 className="text-xl font-bold mb-3">{story.title}</h3>
                            <p className="text-gray-600 mb-4">{story.description}</p>
                            <div className="grid grid-cols-2 gap-2">
                                {story.images.map((img, index) => (
                                    <img key={index} src={img} alt={`Story ${index + 1}`} className="w-full h-36 object-cover rounded-md" />
                                ))}
                            </div>
                            <div className="flex justify-between mt-4">
                                <button className="border border-green-500 text-green-600 hover:bg-green-200  px-7 py-1" onClick={() => setSelectedStory(story)}>
                                    Edit
                                </button>
                                <button className="border border-red-600 text-red-600 hover:bg-red-200 px-7 py-1" onClick={() => handleDelete(story._id)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {
                selectedStory && (
                    <StoryEditModal
                        story={selectedStory}
                        onClose={() => setSelectedStory(null)}
                        onSubmit={handleEditStory}>
                    </StoryEditModal>
                )
            }
        </div>
    );
};

export default ManageStories;
