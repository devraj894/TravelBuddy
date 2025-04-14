import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import CheckOutForm from './CheckOutForm';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/bookings/${id}`)
            .then(res => {
                setBooking(res.data);
                setLoading(false);
            })
    }, [id])

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>;
    }

    if (!booking) {
        return <p className="text-center text-red-500">Booking not found</p>;
    }

    return (
        <div className='min-h-screen p-10'>
            <h2 className='text-4xl font-semibold pb-2 border-b-2 w-1/4'>Payment</h2>
            <div className='mt-7'>
                <p className='text-lg mb-3'><strong>Package:</strong>{booking.packageName}</p>
                <p className='text-lg mb-4'><strong>Price:</strong>{booking.price} BDT</p>
                <Elements stripe={stripePromise}>
                    <CheckOutForm booking={booking}></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;