import { configureStore } from '@reduxjs/toolkit'
//import reducers from slices
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice'
import categoryReducer from './slices/categorySlice'


//creates a redux store, and configures Redux DevTools
export default configureStore({
    reducer: {
        product: productReducer,
        cart: cartReducer,
        category: categoryReducer
    }
})