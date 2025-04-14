import React, { useState } from "react";

const StoryEditModal = ({ story, onClose, onSubmit }) => {
    const [title, setTitle] = useState(story?.title || "");
    const [text, setText] = useState(story?.description || "");
    const [images, setImages] = useState(story?.images || []);
    const [newImages, setNewImages] = useState([]);

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleAddImage = (event) => {
        const files = Array.from(event.target.files);
        setNewImages((prevNewImages) => [...prevNewImages, ...files]);
    };

    const handleSubmit = () => {
        if (!title.trim() || !text.trim()) {
            alert("Title and description cannot be empty.");
            return;
        }
        const updatedData = { title, text, images, newImages };
        onSubmit(updatedData);
    };

    return (
        <div className="modal modal-open text-white">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Story</h3>
                <div className="my-4">
                    <label className="block">Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>
                <div className="my-4">
                    <label className="block">Description:</label>
                    <textarea rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                </div>
                <div className="my-4">
                    <label className="block">Images:</label>
                    <div className="flex flex-wrap gap-2">
                        {images.map((image, index) => (
                            <div key={index} className="relative">
                                <img src={image} alt="Story" className="w-24 h-24 object-cover" />
                                <button
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                    <input type="file" multiple onChange={handleAddImage} className="mt-2" />
                </div>
                <div className="modal-action">
                    <button className="py-1 px-4 border border-blue-600 text-blue-600 bg-blue-100 hover:bg-blue-200" 
                    onClick={handleSubmit}
                    disabled={!title.trim() || !text.trim()}
                    >
                        Save
                    </button>
                    <button className="px-4 py-1 border border-red-600 text-red-600 bg-red-100 hover:bg-red-200" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoryEditModal;
