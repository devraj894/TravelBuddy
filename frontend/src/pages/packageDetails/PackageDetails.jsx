import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TbCurrencyTaka } from 'react-icons/tb';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BookingForm from '../BookingForm/BookingForm';
import { FaClipboardUser } from 'react-icons/fa6';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { toast, ToastContainer } from 'react-toastify';
import DatePicker from 'react-datepicker';

const PackageDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [pkg, setPkg] = useState(null);
    const [guides, setGuides] = useState([]);
    const [tourDate, setTourDate] = useState(new Date());
    const [selectedGuide, setSelectedGuide] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axios.get(`https://assignment-12-server-beryl.vercel.app/packages/${id}`)
            .then(res => {
                console.log(res.data);
                setPkg(res.data);
            })
            .catch(error => {
                console.log('Error fetching package details', error);
            })


        axios.get('https://assignment-12-server-beryl.vercel.app/guides')
            .then(res => {
                setGuides(res.data);
            })
            .catch(error => {
                console.log('Error fetching guides', error);
            })
    }, [id]);

    const handleBooking = () => {
        if(!user){
            navigate('/login');
            return;
        }
        const selectedGuideData = guides.find((guide) => guide.name === selectedGuide);

        const bookingData = {
            packageName: pkg.title,
            touristName: user.displayName,
            touristEmail: user.email,
            touristImage: user.photoURL,
            price: pkg.price,
            tourDate,
            guideName: selectedGuide,
            guideEmail: selectedGuideData?.email || '',
            status: 'pending'
        };

        axiosPublic.post('bookings', bookingData)
        .then(() => {
            toast.success('Booking successful!');
            setShowModal(true);
        })
        .catch(error => {
            console.log('error creating booking:', error);
            toast.error('Booking failed. Please try again');
        })
    }


    if (!pkg) {
        return <span className='loading loading-spinner loading-lg'></span>
    }
    return (
        <div className='min-h-screen md:p-4 pt-16 md:pt-20'>
            <div className='p-5 grid md:grid-cols-8 gap-5'>
                {/* gallery section */}
                <div className='col-span-5 grid grid-rows-3 gap-3'>
                    <img className='row-span-2 h-96 w-full rounded-md' src={pkg.coverImage} alt="" />
                    <div className='row-span-1 grid grid-cols-2 md:grid-cols-4 gap-2'>
                        {
                            pkg.galleryImages?.map((image, index) => (
                                <div key={index}>
                                    <img className='rounded-md' src={image} alt={`Gallery ${index}`} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                {/* about tour section */}
                <div className='col-span-3'>
                    <div>
                        <h2 className='text-3xl md:text-4xl font-bold mb-3'>{pkg.title}</h2>
                        <p className='text-gray-500 mb-4'>{pkg.description}</p>
                        <span className='text-xl font-bold border-0 border-b-2 pr-5'>Price</span>
                        <p className='text-lg flex items-center mt-2'><TbCurrencyTaka />{pkg.price} Taka</p>
                    </div>
                    <div className='mt-5'>
                        <h2 className='text-2xl font-bold mb-4'>Tour plan</h2>
                        <hr className='w-1/2' />
                        {
                            pkg.tourPlan?.map((plan, index) => (
                                <div key={index} className='mt-3'>
                                    <h4 className='font-semibold'>Day {index + 1} :</h4>
                                    <p className='text-gray-700'>{plan}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* tour guides section */}
            <div className="p-5 mt-5 rounded-md">
                <h2 className="text-3xl font-bold mb-5">Meet Our Guides</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {guides.map((guide) => (
                        <div
                            key={guide._id}
                            className="p-4 bg-sky-50 shadow-md rounded-md text-black"
                        >
                            <img className="h-36 w-full object-cover rounded-md" src={guide.photo} alt={guide.name} />
                            <h3 className="mt-3 text-xl font-bold">{guide.name}</h3>
                            <p className="text-gray-600 flex items-center gap-1"><FaClipboardUser />{guide.role}</p>
                            <button
                                onClick={() => navigate(`/guideProfile/${guide._id}`)}
                                className="btn btn-link text-blue-500">
                                View Profile
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className='rounded-md mt-5 p-5'>
                <h2 className='text-2xl font-semibold mb-5'>Book This {pkg.title} Package</h2>
                <form  className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='form-control'>
                        <label>Package Name</label>
                        <input type="text" value={pkg.title} className='input input-bordered text-white' readOnly />
                    </div>
                    <div className='form-control'>
                        <label>Tourist Name</label>
                        <input type="text" value={user?.displayName || ''} className='input input-bordered text-white' readOnly />
                    </div>
                    <div className='form-control'>
                        <label>Tourist Email</label>
                        <input type="email" value={user?.email || ''} className='input input-bordered text-white' readOnly />
                    </div>
                    <div className='form-control'>
                        <label>Tourist Photo</label>
                        <input type="text" value={user?.photoURL || ''} className='input input-bordered text-white' readOnly />
                    </div>
                    <div className='form-control'>
                        <label>Package Price</label>
                        <input type="number" value={pkg.price} className="input input-bordered text-white" readOnly />
                    </div>
                    <div className='form-control'>
                        <label>Tour Date</label>
                        <DatePicker
                            selected={tourDate}
                            onChange={(date) => setTourDate(date)}
                            placeholderText='Select a date'
                            className='input input-bordered text-white'
                        ></DatePicker>
                    </div>
                    <div className='form-control'>
                        <label>Tour Guide</label>
                        <select value={selectedGuide} onChange={(e) => setSelectedGuide(e.target.value)} className='select select-bordered text-white'>
                            <option value="" disabled>Select a guide</option>
                            {
                                guides.map(guide => (
                                    <option key={guide._id} value={guide.name}>{guide.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='text-center mt-4'>
                        <button type='button' onClick={handleBooking} className='py-1 px-5 border bg-sky-600 text-white rounded-md'>Book Now</button>
                    </div>
                </form>               
            </div>
            
            {
                showModal && (
                    <div className='modal modal-open text-white'>
                        <div className="modal-box text-center">
                            <h3 className='text-2xl font-semibold mb-2'>Confirm Your Booking!</h3>
                            <p>Your booking has been successfully created!</p>
                            <div className="modal-action">
                                <button onClick={() => navigate('/dashboard/my-bookings')} className='px-3 py-1 bg-sky-600 text-white hover:bg-sky-800'>Go to My Bookings</button>
                                <button onClick={() => setShowModal(false)} className=' py-1 px-3 border border-gray-500 hover:bg-gray-300'>Close</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default PackageDetails;