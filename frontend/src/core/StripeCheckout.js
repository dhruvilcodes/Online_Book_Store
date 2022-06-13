import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { cartEmpty, loadCart } from './helper/cartHelper'






const StripeCheckOut = ({ products, setReload, reload }) => {

    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    })


    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;


    const getFinalPrice = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)
    }
    const showStripeButton = () => {
        return isAuthenticated() ? (
            <button className='btn btn-success'>Pay with Stripe</button>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Sign In</button>
            </Link>
        )
    }


    return (
        <div>
            <h3 className='text-white'>

                {
                    <table className="table text-white">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Total Count</th>
                        <th scope="col">Total Price</th>
                      </tr>
                    </thead>
                    <tbody>

                   { products.map((product, index) => {
                    return (
                        <tr>
                        <th scope="row">{index+1}</th>
                        <td>{product.name}</td>
                        <td>{product.count}</td>
                        <td>₹{product.count*product.price}</td>
                      </tr>
                    )

                })}
                  </tbody>
                  </table>
                }
                <div className='text-white'>Total amount to be paid: ₹{getFinalPrice()}</div>
                <br />
                {showStripeButton()}
            </h3>
        </div>
    )
}

export default StripeCheckOut