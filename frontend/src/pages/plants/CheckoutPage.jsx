import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import getBaseUrl from '../../utils/baseURL';

const CheckoutPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    // Calculate total price in rupees (as a string with two decimals)
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const apiUrl = `${getBaseUrl()}/api/payment/khalti/initiate`;

    // Initiate Khalti payment: stores form data and redirects user
    const handlePayment = async (data) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Convert amount to paisa
                body: JSON.stringify({ amount: totalPrice * 100 })
            });

            const paymentData = await response.json();

            if (!paymentData.payment_url) {
                Swal.fire('Payment Error', 'Failed to get payment URL.', 'error');
                return;
            }

            // Store order data in localStorage to use after payment verification
            localStorage.setItem("orderData", JSON.stringify(data));
            // Redirect user to Khalti payment page
            window.location.href = paymentData.payment_url;
        } catch (error) {
            console.error('Payment initiation error:', error);
            Swal.fire('Payment Error', 'Failed to initiate payment.', 'error');
        }
    };

    // onSubmit only initiates payment; order creation is handled after redirect
    const onSubmit = async (data) => {
        await handlePayment(data);
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
                                            <label>City (Describe Proper Location)</label>
                                            <input {...register("city", { required: true })} type="text" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label>Country</label>
                                            <input {...register("country", { required: true })} type="text" id="country" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>
                                        <div className="md:col-span-5 text-right mt-8">
                                            <button 
                                                type="submit"
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
