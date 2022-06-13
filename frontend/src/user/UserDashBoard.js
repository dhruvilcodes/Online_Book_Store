import React,{ useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { getUser } from "../admin/helper/adminapicall";

const UserDashBoard =()=> {
  const {user,token}=isAuthenticated();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const check=()=>{
      getUser(user._id,token).then((data)=>{

           setName(data.name);
           setEmail(data.email)
      }).catch(e=>console.log(e));
  } 
  useEffect(() => {
    check();
}, []);
  const adminLeftSide=()=>{
    return(
      <div className='card'>
       <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
       <ul className="list-group">
         <li className="list-group-item">
           <Link to="/user/profile" className='nav-link text-success'>Manage Profie</Link>
          </li>
         {/* <li className="list-group-item">
           <Link to="/admin/orders" className='nav-link text-success'>Manage Orders</Link>
         </li> */}
       </ul>
      </div>
    )

 
  };
  const adminRightSide=()=>{
      return(
        <div className='card mb-4'>
          <h4 className='card-header'>Admin Information</h4>
          <ul className='list-group'>
            <li className="list-group-item">
               <span className="badge bg-success">Name:</span> {name} 
            </li>

            <li className="list-group-item">
               <span className="badge bg-success">Email:</span> {email} 
            </li>
            <li className="list-group-item">
              <span className="badge bg-danger">User Area</span>
            </li>

          </ul>
        </div>
      )
  };
  return (
    <Base title='Welcome to User Area' description='Manage your profile here' className='container bg-success p-4'>
    <div className='row'>
    <div className='col-3'>{adminLeftSide()} </div>
        <div className='col-9'> {adminRightSide()} </div>
    </div>
  </Base>
)
}

export default UserDashBoard;

