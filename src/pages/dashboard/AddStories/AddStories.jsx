import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const imageHostingApiKey = import.meta.env.VITE_Image_Hosting_Api_Key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;

const AddStory = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();


  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...newImages]);
  };


  const uploadImageToImgBB = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const response = await axios.post(imageHostingApi, formData);
      return response.data.data.display_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      throw new Error('Image upload failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || images.length === 0) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required, including at least one image.',
      });
    }

    try {
      Swal.fire({
        title: 'Uploading...',
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const imageUrls = [];
      for (const image of images) {
        const imageUrl = await uploadImageToImgBB(image);
        imageUrls.push(imageUrl);
      }

      // Prepare story data
      const storyData = {
        title,
        description,
        userEmail: user?.email,
        images: imageUrls,
      };

      // Send POST request to backend
      const response = await axios.post(
        'https://assignment-12-server-beryl.vercel.app/stories',
        storyData
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Story added successfully!',
        });
        navigate('/dashboard/manage-stories');
      }
    } catch (error) {
      console.error('Error adding story:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to add story.',
      });
    }
  };

  return (
    <div className="min-h-screen p-5">
      <h2 className="text-3xl font-bold text-center mb-5">Add a Story</h2>
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-5 shadow-md rounded-md">
        <div className="form-control mb-4">
          <label className="label">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered text-white"
            placeholder="Enter story title"
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered text-white"
            placeholder="Write your story"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-control mb-4">
          <label className="label">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="file-input file-input-bordered text-white"
            required
          />
          {images.length > 0 && (
            <div className="mt-2">
              <p className="font-semibold">Selected Images:</p>
              <ul className="list-disc list-inside">
                {images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-full">
          Submit Story
        </button>
      </form>
    </div>
  );
};

export default AddStory;
