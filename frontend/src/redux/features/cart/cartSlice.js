import { createSlice } from "@reduxjs/toolkit";
import Swal  from "sweetalert2";

// Function to load cart from localStorage
const loadCartFromLocalStorage = () => {
    const cart = localStorage.getItem("cartItems");
    return cart ? JSON.parse(cart) : [];
};
const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: loadCartFromLocalStorage(),
    },
    reducers:{
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.cartItems.push(action.payload);
                
                // Save updated cart to localStorage
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added to the Cart",
                    showConfirmButton: false,
                    timer: 1000
                });
            }
            else(
                Swal.fire({
                    title: "Already Added to the Cart",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "OK!"
                  })
            )
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // Update localStorage
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.removeItem("cartItems"); // Clear localStorage
        }
    }
})

// export the actions   
export const  {addToCart, removeFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;