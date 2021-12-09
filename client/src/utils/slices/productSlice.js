import { createSlice } from '@reduxjs/toolkit'

/* Actions/Reducers in Slice
UPDATE_PRODUCTS
*/

const initialState =  {
  products: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    updateProducts: (state, action)=> {
        state.products = action.payload;
    }
  }
});

export const selectProducts = (state) => state.product.products;

// Action creators are generated for each case reducer function
export const { updateProducts } = productSlice.actions

export default productSlice.reducer