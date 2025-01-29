import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/plants`,  // Updated to plants API
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const plantsApi = createApi({
    reducerPath: 'plantsApi',  // Updated to plantsApi
    baseQuery,
    tagTypes: ['Plants'],  // Updated to Plants
    endpoints: (builder) => ({
        fetchAllPlants: builder.query({
            query: () => "/",
            providesTags: ["Plants"]  // Updated to Plants
        }),
        fetchPlantById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ types: "Plants", id }]  // Updated to Plants
        }),
        addPlant: builder.mutation({
            query: (newPlant) => ({
                url: `/create-plant`,  // Updated to create-plant
                method: "POST",
                body: newPlant
            }),
            invalidatesTags: ["Plants"]  // Updated to Plants
        }),
        updatePlant: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ["Plants"]  // Updated to Plants
        }),
        deletePlant: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Plants"]  // Updated to Plants
        })
    })
})

export const {
    useFetchAllPlantsQuery,  // Updated to useFetchAllPlantsQuery
    useFetchPlantByIdQuery,  // Updated to useFetchPlantByIdQuery
    useAddPlantMutation,     // Updated to useAddPlantMutation
    useUpdatePlantMutation,  // Updated to useUpdatePlantMutation
    useDeletePlantMutation  // Updated to useDeletePlantMutation
} = plantsApi;

export default plantsApi;
