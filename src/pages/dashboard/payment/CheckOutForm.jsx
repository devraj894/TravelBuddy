import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { toast, ToastContainer } from 'react-toastify';

const CheckOutForm = ({booking}) => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const {price, _id} = booking;
    const {user} = useAuth();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', {price})
        .then(res => {
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        })
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log('Payment error', error);
            setError(error.message);
        } else {
            console.log('Payment method:', paymentMethod);
            setError(null);
        }

        // confirm payment
        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email,
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError){
            console.log('confirmError');
            setError(confirmError.message);
            return;
        }
        else{
            console.log('paymentIntent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id:', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                await axiosSecure.patch(`/bookings/payment/${_id}`, {
                    transactionId: paymentIntent.id
                })
                .then(res => {
                    toast.success('Payment Successful. Your booking is in review now!')
                })
                .catch(error => {
                    toast.error('Failed to make the payment.')
                })
                }
            }
        
    }
    return (
        <div className='mt-8'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4'
                                },
                            },
                            invalid: {
                                color: '#9e2146'
                            },
                        },
                    }}
                >
                </CardElement>
                <button className='bg-sky-700 px-3 text-white mt-5' type='submit' disabled={!stripe || !clientSecret}>Pay</button>
                <p className='text-red-700'>{error}</p>
                {
                    transactionId && <p className='text-green-600'>Your Transaction Id: {transactionId}</p>
                }
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default CheckOutForm;