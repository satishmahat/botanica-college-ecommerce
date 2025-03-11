import React from 'react'
import { useGetOrderByEmailQuery } from '../../redux/features/orders/ordersApi'
import { useAuth } from '../../context/AuthContext';

const OrderPage = () => {
    
    const { currentUser} = useAuth()


    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error geting orders data</div>
    return (
        <div className='container mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Your Orders</h2>
            {
                orders.length === 0 ? (<div>No orders found!</div>) : (<div>
                    {
                        orders.map((order, index) => (
                            <div key={order._id} className="border-b mb-4 pb-4">
                                <div className='flex gap-2'>
                                <h3 className='p-1 bg-secondary text-white w-10 rounded mb-1'># {index + 1}</h3>
                                <h3 className='p-1 bg-white text-secondary border rounded border-secondary mb-1'>Status :  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}</h3>
                                </div>
                                <h2 className="font-bold">Order ID: {order._id}</h2>
                                <p className="text-gray-600">Name: {order.name}</p>
                                <p className="text-gray-600">Email: {order.email}</p>
                                <p className="text-gray-600">Phone: {order.phone}</p>
                                <p className="text-gray-600">Total Price: Rs. {order.totalPrice}</p>
                                <h3 className="font-semibold mt-2">Address:</h3>
                                <p> {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
                                <h3 className="font-semibold mt-2">Products Id:</h3>
                                <ul>
                                    {order.productIds.map((productId) => (
                                        <li key={productId}>{productId}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    }
                </div>)
            }
        </div>
    )
}

export default OrderPage