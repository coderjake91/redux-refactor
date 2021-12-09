import { createSlice } from '@reduxjs/toolkit'

/* Actions/Reducers in Slice
UPDATE_CATEGORIES, 
UPDATE_CURRENT_CATEGORY
*/

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    currentCategory: ''
  },
  reducers: {
    updateCategories: (state, action)=> {
      state.categories = action.payload;
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory =  action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateCategories, updateCurrentCategory } = categorySlice.actions

export default categorySlice.reducer