import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getAllOrders } from '../admin/helper/adminapicall';
const format = require('date-fns/format')
const UserOrders = () => {
    const [orders, setOrders] = useState([])
    const { user, token } = isAuthenticated()


    const preload = () => {
        getAllOrders(user._id,token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setOrders(data);
            }
        })
    }

    useEffect(() => {
        preload();
    }, [])

    const getAmount=(product)=>{
        let amount=0;
         product.forEach(element => {
            amount+=(element.price*element.count)
         });
         return amount
    }

    return (
        <Base title="Welcome User" description="Manage Orders here">
            <h2 className="mb-4">All Orders:</h2>
            <Link className="btn btn-info" to={`/user/dashboard`}>
                <span className="">User Home</span>
            </Link>
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center text-white my-3">Total {orders.length} Orders</h2>
                    

                </div>
                {
                    <table className="table text-white">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Total Amount</th>
                        <th scope="col"> Status</th>
                      </tr>
                    </thead>
                    <tbody>

                   { orders.map((order, index) => {
                    let p=order;
                    console.log(p);
                    return (
                        <tr>
                        <th scope="row">{index+1}</th>
                       
                        <td>{order.createdAt}</td>
                        <td>{getAmount(order.products)}</td>
                        <td>{order.status}</td>
                      </tr>
                    )

                })}
                  </tbody>
                  </table>
                }
            </div>

        </Base>
    )
}




export default  UserOrders;