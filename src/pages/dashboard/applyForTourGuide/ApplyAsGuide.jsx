import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';


const ApplyAsGuide = () => {

    const {user} = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
  

    const onSubmit = async (data) => {

        const guideApplication = {
            name: user.displayName,
            email: user.email,
            title: data.title,
            reason: data.reason,
            cvLink: data.cvLink
        }

        console.log(guideApplication);


        try{
            const response = await axios.post('https://assignment-12-server-beryl.vercel.app/guideApplications', guideApplication);
            if(response.status === 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Application Submitted!',
                    text: 'Your application to become a tour guide has been successfully submitted.',
                    confirmButtonText: 'OK',
                });
                reset();
            }
        }
        catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message || 'Failed to submit application.',
            });
        }
    }
    return (
        <div className='min-h-screen p-10'>
            <div>
                <h2 className='text-3xl font-semibold mb-5'>Join as a Tour Guide</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control mb-4">
                        <label className="label">Application Title</label>
                        <input
                            type="text"
                            {...register('title', { required: 'Application title is required' })}
                            className="input input-bordered"
                            placeholder="Enter application title"
                        />
                        {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">Why do you want to be a Tour Guide?</label>
                        <textarea
                            {...register('reason', { required: 'Reason is required' })}
                            className="textarea textarea-bordered"
                            placeholder="Explain why you want to be a guide"
                            rows="4"
                        ></textarea>
                        {errors.reason && <p className="text-red-500 mt-1">{errors.reason.message}</p>}
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">CV Link</label>
                        <input
                            type="url"
                            {...register('cvLink', {
                                required: 'CV link is required',
                                pattern: {
                                    value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
                                    message: 'Invalid URL format',
                                },
                            })}
                            className="input input-bordered"
                            placeholder="Enter your CV link"
                        />
                        {errors.cvLink && <p className="text-red-500 mt-1">{errors.cvLink.message}</p>}
                    </div>
                    <div className="form-control mt-4">
                        <button type="submit" className="btn btn-primary w-full text-white">
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default ApplyAsGuide;