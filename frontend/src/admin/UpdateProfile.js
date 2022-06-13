import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import { getUser,updateProfile } from "./helper/adminapicall";






const UpdateProfile = ({match}) => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
      });
      const { name, email, password, error, success } = values;
      const preLoadUser=(userId)=>{
             return(
                getUser(userId,token).then((response)=>{
                  setValues({...values,name:response.name, email:response.email,password:""})
                }).catch((e)=>(setValues({ ...values, error: false})))
             )
      }
    useEffect(() => {
        preLoadUser(user._id);
    }, []);
   
    
     
    
      const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };
    
      const onSubmit = event => {
        event.preventDefault();
        updateProfile({ name, email },user._id,token)
          .then(data => {
            if (data.error) {
              setValues({ ...values, error: data.error, success: false });
            } else {
              console.log(data);
              setValues({
                ...values,
                success: true
              });
            }
          })
          .catch((e)=>console.log(e))
      };
    
    const successMessage = () => (
        <div className="alert alert-success mt-3" style={{ display: success ? "" : "none" }}>
            <h4>Profile Updated successfully</h4>
        </div>
    )

    const updateProfileForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-light">Name</label>
                  <input
                    className="form-control"
                    onChange={handleChange("name")}
                    type="text"
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <label className="text-light">Email</label>
                  <input
                    className="form-control"
                    onChange={handleChange("email")}
                    type="email"
                    value={email}
                  />
                </div>
    
                <div className="form-group">
                  <label className="text-light">Password</label>
                  <input
                    onChange={handleChange("password")}
                    className="form-control"
                    type="password"
                    value={password}
                  />
                </div>
                <button onClick={onSubmit} className="btn btn-success btn-block " center>
                  Submit
                </button>
                <div>{JSON.stringify(values)}</div> 
              </form>
            </div>
          </div>
        );
      };
   
    return (
        <Base
            title="Update your profiile here!"
            description="Welcome to profile updation section"
            className="container bg-info p-4"
        >
            <Link to="/user/dashboard" className="btn btn-md btn-dark mb-3">
                User Home
            </Link>
            <div className="row bg-dark text-white rounded">


                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {updateProfileForm()}
                </div>
            </div>
        </Base>
    );
};
export default UpdateProfile;