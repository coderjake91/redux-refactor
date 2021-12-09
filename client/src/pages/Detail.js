import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PRODUCTS } from "../utils/queries";
import { idbPromise } from "../utils/helpers";
import spinner from '../assets/spinner.gif'
import Cart from "../components/Cart";
//import { useStoreContext } from "../utils/GlobalState";
// import {
//   REMOVE_FROM_CART,
//   UPDATE_CART_QUANTITY,
//   ADD_TO_CART,
//   UPDATE_PRODUCTS,
// } from "../utils/actions";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromUserCart,
         updateCartQuantity,
         addToUserCart, 
         selectCart} from "../utils/slices/cartSlice";

import { selectProducts, updateProducts } from "../utils/slices/productSlice";



function Detail() {
  //const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const cart  = useSelector(selectCart);
  const products = useSelector(selectProducts);
  const dispatch = useDispatch();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find(product => product._id === id));
    } 
    // retrieved from server
    else if (data) {
      dispatch(updateProducts(data.products));
      // dispatch({
      //   type: UPDATE_PRODUCTS,
      //   products: data.products
      // });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch(updateProducts(indexedProducts));
        // dispatch({
        //   type: UPDATE_PRODUCTS,
        //   products: indexedProducts
        // });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id)
    if (itemInCart) {
      dispatch(updateCartQuantity(id, parseInt(itemInCart.purchaseQuantity) + 1));
      // dispatch({
      //   type: UPDATE_CART_QUANTITY,
      //   _id: id,
      //   purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      // });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(addToUserCart({...currentProduct, purchaseQuantity: 1 }));
      // dispatch({
      //   type: ADD_TO_CART,
      //   product: { ...currentProduct, purchaseQuantity: 1 }
      // });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });

    }
  }

  const removeFromCart = () => {
    dispatch(removeFromUserCart(id));
    // dispatch({
    //   type: REMOVE_FROM_CART,
    //   _id: currentProduct._id
    // });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={addToCart}>
              Add to Cart
            </button>
            <button 
              disabled={!cart.find(p => p._id === currentProduct._id)} 
              onClick={removeFromCart}
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
      <Cart />
    </>
  );
};

export default Detail;
