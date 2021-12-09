import { createSlice } from '@reduxjs/toolkit'

/* Actions/Reducers in Slice
UPDATE_PRODUCTS
*/

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: []
  },
  reducers: {
    updateProducts: (state, action)=> {
        state.products.push(action.payload);
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateProducts } = productSlice.actions

export default productSlice.reducer