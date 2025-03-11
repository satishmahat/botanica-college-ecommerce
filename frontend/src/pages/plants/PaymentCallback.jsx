import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import getBaseUrl from '../../utils/baseURL';
import { useAuth } from '../../context/AuthContext';

const PaymentCallback = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [createOrder] = useCreateOrderMutation();

    const verifyPaymentAndCreateOrder = async (pidx) => {
        try {
            // 1. Verify Payment by sending pidx to backend
            const verifyResponse = await fetch(`${getBaseUrl()}/api/payment/khalti/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pidx })
            });
            const verifyData = await verifyResponse.json();
            if (!verifyData.success) {
                Swal.fire('Payment Verification Failed', 'Payment was not successful.', 'error');
                return;
            }

            // 2. Retrieve stored order data from localStorage
            const storedData = JSON.parse(localStorage.getItem("orderData"));
            if (!storedData) {
                Swal.fire('Order Failed', 'Order data is missing. Please try again.', 'error');
                return;
            }

            // 3. Create the order object
            const newOrder = {
                name: storedData.name,
                email: currentUser?.email,
                address: { city: storedData.city, country: storedData.country },
                phone: storedData.phone,
                productIds: cartItems.map(item => item._id),
                totalPrice,
            };
            await createOrder(newOrder).unwrap();
            Swal.fire('Order Confirmed', 'Your order has been placed!', 'success');
            navigate('/orders');

            // 4. Clear stored order data
            localStorage.removeItem("orderData");
        } catch (error) {
            console.error('Order error:', error);
            // Swal.fire('Order Failed', 'Try again.', 'error');
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const pidx = urlParams.get('pidx');
        if (pidx) {
            verifyPaymentAndCreateOrder(pidx);
        }
    }, [createOrder, currentUser, cartItems, navigate, totalPrice]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <p>Verifying payment, please wait...</p>
        </div>
    );
};

export default PaymentCallback;
