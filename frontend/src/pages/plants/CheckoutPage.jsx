import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import getBaseUrl from '../../utils/baseURL';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    const { register, handleSubmit } = useForm();
    const [createOrder] = useCreateOrderMutation();
    const navigate = useNavigate();
    const [paymentInitiated, setPaymentInitiated] = useState(false);
    const apiUrl = `${getBaseUrl()}/api/payment/khalti/initiate`;

    const handlePayment = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: totalPrice * 100 }) // Amount in paisa
            });
    
            const data = await response.json();
            // console.log("Khalti API Response:", data); // Debugging
    
            if (data.payment_url) {
                window.location.href = data.payment_url; // Redirect user to Khalti payment page
            } else {
                Swal.fire('Payment Error', 'Failed to get payment URL.', 'error');
            }
        } catch (error) {
            console.error('Payment initiation error:', error);
            Swal.fire('Payment Error', 'Failed to initiate payment.', 'error');
        }
    };
    
    

    const onSubmit = async (data) => {

       await handlePayment()

        // if (!paymentInitiated) {
        //     Swal.fire('Payment Required', 'Complete payment before placing the order.', 'warning');
        //     return;
        // }

        try {
            const newOrder = {
                name: data.name,
                email: currentUser?.email,
                address: { city: data.city, country: data.country },
                phone: data.phone,
                productIds: cartItems.map(item => item._id),
                totalPrice,
            };
            
            await createOrder(newOrder).unwrap();
            Swal.fire('Order Confirmed', 'Your order has been placed!', 'success');
            navigate('/orders');
        } catch (error) {
            console.error('Order error:', error);
            Swal.fire('Order Failed', 'Try again.', 'error');
        }
    };
    

    return (
        <section>
            <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div>
                            <h2 className="font-semibold text-xl text-gray-600 mb-2">Checkout</h2>
                            <p className="text-gray-500 mb-2">Total Price: Rs. {totalPrice}</p>
                            <p className="text-gray-500 mb-6">Items: {cartItems.length}</p>
                        </div>

                        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Personal Details</p>
                                    <p>Please fill out all the fields.</p>
                                </div>

                                <div className="lg:col-span-2">
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="full_name">Full Name</label>
                                            <input {...register("name", { required: true })} type="text" id="name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label>Email Address</label>
                                            <input type="text" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" disabled defaultValue={currentUser?.email} />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label>Phone Number</label>
                                            <input {...register("phone", { required: true })} type="number" id="phone" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label>City (Describe Proper Location) </label>
                                            <input {...register("city", { required: true })} type="text" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label>Country</label>
                                            <input {...register("country", { required: true })} type="text" id="country" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>


                                        <div className="md:col-span-5 text-right mt-8">
                                        <button 
                                        type='submit'
                                            className="font-bold py-2 px-4 rounded bg-purple-800 hover:bg-purple-900 text-white"
                                        >
                                           Place Order with Khalti
                                        </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
