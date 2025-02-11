import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api/orders`,
        credentials: 'include'
    }),
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials: 'include',
            }),
            invalidatesTags: ['Orders']
        }),
        getOrderByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`
            }),
            providesTags: ['Orders']
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: "/",
                method: "GET",
            }),
            providesTags: ['Orders']
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/${id}`,
                method: "PUT",
                body: { status },
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: ['Orders']
        })
    })
});

export const { useCreateOrderMutation, useGetOrderByEmailQuery, useGetAllOrdersQuery , useUpdateOrderStatusMutation} = ordersApi;

export default ordersApi;
