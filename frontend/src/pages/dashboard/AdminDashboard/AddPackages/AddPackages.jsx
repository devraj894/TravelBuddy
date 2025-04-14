import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const imageHostingApiKey = import.meta.env.VITE_Image_Hosting_Api_Key;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingApiKey}`;

const AddPackages = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [galleryImages, setGalleryImages] = useState([]);

  // Handle gallery image file selection
  const handleGalleryImages = (e) => {
    const newImages = Array.from(e.target.files);
  setGalleryImages((prevImages) => [...prevImages, ...newImages]);
  };

  // Upload a single image to ImgBB
  const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await axios.post(imageHostingApi, formData);
    return response.data.data.display_url;
  };

  const onSubmit = async (data) => {
    try {
      Swal.fire({ title: 'Uploading...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
  
      // Upload cover image
      const coverImageUrl = await uploadImageToImgBB(data.coverImage[0]);
  
      // Upload gallery images
      const galleryImageUrls = [];
      for (const image of galleryImages) {
        const imageUrl = await uploadImageToImgBB(image);
        galleryImageUrls.push(imageUrl);
      }
  
      // Prepare package data
      const packageData = {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        tourPlan: data.tourPlan.split('\n'),
        tourType: data.tourType,
        coverImage: coverImageUrl,
        galleryImages: galleryImageUrls,
      };
  
      // Send POST request to backend
      const response = await axios.post('https://assignment-12-server-beryl.vercel.app/packages', packageData);
  
      if (response.status === 200) {
        Swal.fire('Success', 'Package added successfully!', 'success');
        reset();
        setGalleryImages([]);
      }
    } catch (error) {
      console.error('Error adding package:', error);
      Swal.fire('Error', 'Failed to add package. Please try again.', 'error');
    }
  };
  

  return (
    <div className='min-h-screen p-10'>
      <h2 className='text-4xl font-bold mb-5 text-center dark:text-white'>Add Packages</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='dark:bg-gray-200 p-5'>
        <div className='form-control mb-4'>
          <label>Package Name</label>
          <input type="text" {...register('title', { required: 'Package name is required' })} className='input input-bordered' placeholder='Enter package name' />
          {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div className='form-control mb-4'>
          <label>Package Description</label>
          <textarea {...register('description', { required: 'Description is required' })} className='textarea textarea-bordered' placeholder='Enter description' rows='4'></textarea>
          {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        <div className='form-control mb-4'>
          <label>Price</label>
          <input type="number" {...register('price', { required: 'Price is required' })} className='input input-bordered' placeholder='Enter Price' />
          {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
        </div>

        <div className='form-control mb-4'>
          <label>Tour Plan</label>
          <textarea {...register('tourPlan', { required: 'Tour plan is required' })} className='textarea textarea-bordered' placeholder='Enter tour plan (one per line)' rows='5'></textarea>
          {errors.tourPlan && <p className="text-red-500 mt-1">{errors.tourPlan.message}</p>}
        </div>

        <div className='form-control mb-4'>
          <label>Tour Type</label>
          <input type="text" {...register('tourType', { required: 'Tour type is required' })} className='input input-bordered' placeholder='Enter tour type (e.g., Adventure, Relaxation)' />
          {errors.tourType && <p className="text-red-500 mt-1">{errors.tourType.message}</p>}
        </div>

        <div className='form-control mb-4'>
          <label>Cover Image</label>
          <input type="file" {...register('coverImage', { required: 'Cover image is required' })} className='file-input file-input-bordered' />
          {errors.coverImage && <p className="text-red-500 mt-1">{errors.coverImage.message}</p>}
        </div>

        <div className='form-control mb-4'>
          <label>Gallery Images</label>
          <input type="file" multiple onChange={handleGalleryImages} className='file-input file-input-bordered' />
          {galleryImages.length > 0 && (
            <div className='mt-3'>
              <p className='font-semibold'>Selected Images:</p>
              <ul className='list-disc list-inside'>
                {galleryImages.map((image, index) => <li key={index}>{image.name}</li>)}
              </ul>
            </div>
          )}
        </div>

        <div className='text-center'>
          <button type="submit" className="py-2 px-4 text-white rounded-md bg-sky-800">Add Package</button>
        </div>
      </form>
    </div>
  );
};

export default AddPackages;
