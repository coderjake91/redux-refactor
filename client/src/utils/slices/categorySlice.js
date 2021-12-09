import { createSlice } from '@reduxjs/toolkit'

/* Actions/Reducers in Slice
UPDATE_CATEGORIES, 
UPDATE_CURRENT_CATEGORY
*/

const initialState = {
  categories: [],
  currentCategory: ''
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateCategories: (state, action)=> {
      state.categories = action.payload;
    },
    updateCurrentCategory: (state, action) => {
      state.currentCategory =  action.payload;
    }
  }
});

export const selectCatagories = (state) => state.category.categories;
export const selectCurrentCategory = (state) => state.category.currentCategory;

// Action creators are generated for each case reducer function
export const { updateCategories, updateCurrentCategory } = categorySlice.actions

export default categorySlice.reducer