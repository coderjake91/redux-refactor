import { createSlice } from '@reduxjs/toolkit'

/* Actions/Reducers in Slice
ADD_TO_CART, 
UPDATE_CART_QUANTITY, 
REMOVE_FROM_CART, 
ADD_MULTIPLE_TO_CART, 
CLEAR_CART, 
TOGGLE_CART
*/


//Immer (within Redux toolkit) allows for managing state flow in the reducer without worrying about mutating state (i.e no rest operator syntax required)

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    cartOpen: false
  },
  reducers: {
    addToUserCart: (state, action) => {
      state.cartOpen = true;
      state.cart.push(action.payload);
    },
    updateCartQuantity: (state, action) => {
      state.cartOpen =  true
      state.cart = state.cart.map(product => {
        if (action.payload._id === product._id) {
           product.purchaseQuantity = action.payload.purchaseQuantity
        }
          return product
        });
    },
    removeFromUserCart: (state, action) => {
      let newState = state.cart.filter(product => {
          return product._id !== action.payload._id;
        });
  
      state.cartOpen =  newState.length > 0,
      state.cart =  newState;

    },
    addMultipleToCart: (state, action) => {
      state.cart.concat(action.payload);
    },
    clearCart: state => {
      state.cartOpen =  false;
    },
    toggleUserCart: state => {
      state.cartOpen = !state.cartOpen;
    }
  }
});

// Action creators are generated for each reducer in the slice
export const { addToUserCart,
               updateCartQuantity,
               removeFromUserCart,
               addMultipleToCart,
               clearCart,
               toggleUserCart } = cartSlice.actions

export default cartSlice.reducer