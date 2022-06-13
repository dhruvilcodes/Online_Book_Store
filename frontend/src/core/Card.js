import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart,removeAItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload,
  reload,
  setRefresh,
  refresh
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const [error, setError] = useState(false);
  const cartTitle = product ? product.name : "No Title";
  const cartDescrption = product ? product.description : "No Description";
  const cartPrice = product ? product.price : "No Photo";

  const addToCart = () => {
    addItemToCart(product, () =>{ setRefresh(!refresh)});
  };


  const showAddToCart = addtoCart => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>

         
      )
    );
  };


  
  const showaRemoveFromCart = removeFromCart => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeAItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove One from cart
        </button>

         
      )
    );
  };


  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            Out of Stock
          </div>
        </div>
      </div>
    );
  };



  const currentStock = (product) => {
    let cart = [];
    let count=0;
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.forEach((item, index) => {
        if (product._id === item._id) {
          count= item.count;
        }
      })
    }
    if(!error && product.stock===count)
    {
      setError(true);
    }
    return count;
  }

  return (
    <div className="card text-white bg-dark border border-info ">
      {error && !removeFromCart && errorMessage()}
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">

        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescrption}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">₹ {cartPrice}</p>
        <br />
    
        <p className="btn btn-info rounded  btn-sm px-4">Stock: {product.stock-currentStock(product)} </p>
        <div className="row">

          <div className="col-12">{!error && showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}             {showaRemoveFromCart(removeFromCart)}</div>
          
        </div>
      </div>
    </div>
  )
  };

export default Card;
