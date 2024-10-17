import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";
import wishListSlice from "./wishListSlice";
import cartSlice from "./cartSlice";

const cartStore = configureStore({
    reducer:{
        productReducer:productSlice,
        wishlistReducer:wishListSlice,
        cartReducer:cartSlice
    }
})

export default cartStore