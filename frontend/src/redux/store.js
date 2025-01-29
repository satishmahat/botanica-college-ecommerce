import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import plantsApi from './features/plants/plantsApi'  // Updated to plantsApi
import ordersApi from './features/orders/ordersApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [plantsApi.reducerPath]: plantsApi.reducer,  // Updated to plantsApi
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(plantsApi.middleware, ordersApi.middleware),  // Updated to plantsApi
})
