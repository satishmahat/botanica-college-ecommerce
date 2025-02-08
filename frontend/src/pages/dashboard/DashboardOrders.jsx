import React from "react";
import { useGetAllOrdersQuery } from "../../redux/features/orders/ordersApi";

const DashboardOrders = () => {
  const { data: orders = [], isLoading, isError } = useGetAllOrdersQuery();

  if (isLoading) return <p className="text-center py-6">Loading orders...</p>;
  if (isError) return <p className="text-center text-red-500 py-6">Failed to load orders.</p>;

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Your Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-2 px-4 border">#</th>
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Phone</th>
              <th className="py-2 px-4 border">Total Price</th>
              <th className="py-2 px-4 border">Address</th>
              <th className="py-2 px-4 border">Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id} className="text-center border-b">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{order._id}</td>
                  <td className="py-2 px-4">{order.name}</td>
                  <td className="py-2 px-4">{order.email}</td>
                  <td className="py-2 px-4">{order.phone}</td>
                  <td className="py-2 px-4">${order.totalPrice}</td>
                  <td className="py-2 px-4">
                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </td>
                  <td className="py-2 px-4">
                    <ul className="text-left">
                      {order.productIds.map((productId) => (
                        <li key={productId} className="text-sm">{productId}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardOrders;
