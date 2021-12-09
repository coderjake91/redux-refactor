import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
//import { useStoreContext } from '../../utils/GlobalState';
//import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { selectCatagories, updateCategories, updateCurrentCategory } from '../../utils/slices/categorySlice';
import { useSelector, useDispatch } from 'react-redux';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  //const [state, dispatch] = useStoreContext();
  const categories = useSelector(selectCatagories);
  const dispatch = useDispatch();

  //const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch(updateCategories(categoryData.categories));
      // dispatch({
      //   type: UPDATE_CATEGORIES,
      //   categories: categoryData.categories
      // });
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch(updateCategories(categories));
        // dispatch({
        //   type: UPDATE_CATEGORIES,
        //   categories: categories
        // });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = id => {
    dispatch(updateCurrentCategory(id));
    // dispatch({
    //   type: UPDATE_CURRENT_CATEGORY,
    //   currentCategory: id
    // });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map(item => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
