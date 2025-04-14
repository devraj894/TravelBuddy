
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import axios from 'axios';

const BookingForm = ({ packageDetails, guides }) => {
    const { user } = useAuth();
    console.log(user);

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedGuide, setSelectedGuide] = useState('');

    const handleBooking = async (e) => {
        e.preventDefault();
        if (!selectedGuide || !selectedDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Form',
                text: 'Please select a guide and a tour date.',
            });
            return;
        }

        const bookingData = {
            packageId: packageDetails._id,
            packageName: packageDetails.title,
            touristName: user.displayName,
            touristEmail: user.email,
            touristPhoto: user.photoURL,
            price: packageDetails.price,
            tourDate: selectedDate,
            guideName: selectedGuide,
            status: 'pending',
        }

        try {
            const res = await axios.post('http://localhost:5000/bookings', bookingData);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Booking Confirmed',
                    text: 'Your booking request has been submitted successfully!',
                    confirmButtonText: 'Go to My Bookings',
                }).then(() => {
                    window.location.href = '/dashboard/my-bookings';
                });
            }
        } catch (error) {
            console.error('Error booking package:', error);
        }
    }

    return (
        <div className='bg-base-100 rounded-md mt-5 p-5'>
            <h2 className='text-2xl font-semibold mb-5'>Book This {packageDetails.title} Package</h2>
            <form onSubmit={handleBooking} className='space-y-2'>
                <div className='form-control'>
                    <label>Tourist Name</label>
                    <input type="text" value={user.displayName || ''} className='input input-bordered' readOnly />
                </div>
                <div className='form-control'>
                    <label>Tourist Email</label>
                    <input type="email" value={user?.email || ''} className='input input-bordered' readOnly />
                </div>
                <div className='form-control'>
                    <label>Tourist Photo</label>
                    <input type="text" value={user?.photoURL || ''} className='input input-bordered' readOnly />
                </div>
                <div className='form-control'>
                    <label>Package Price</label>
                    <input type="text" value={`৳ ${packageDetails.price}`} className="input input-bordered" readOnly />
                </div>
                <div className='form-control'>
                    <label>Tour Date</label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        placeholderText='Select a date'
                        className='input input-bordered'
                    ></DatePicker>
                </div>
                <div className='form-control'>
                    <label>Tour Guide</label>
                    <select value={selectedGuide} onChange={(e) => setSelectedGuide(e.target.value)} className='select select-bordered'>
                        <option value="" disabled>Select a guide</option>
                        {
                            guides.map(guide => (
                                <option key={guide._id}>{guide.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className='text-center mt-4'>
                    <button type='submit' className='py-1 px-5 border bg-sky-600 text-white rounded-md'>Book Now</button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;