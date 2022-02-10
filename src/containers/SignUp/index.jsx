import React, { useState } from "react";

import { useDispatch } from 'react-redux';
import { signupUser,signingUser } from "../../Store/reducer";
import { axiosInstance } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [fullName, setFullname] = useState("Bobba Vamsi");
  const [userName, setUsername] = useState("vamsi805");
  const [email, setEmail] = useState("vamsi@gmail.com");
  const [password, setPassword] = useState("@ab17@vk18");
  const [contactNumber, setContact] = useState("9553699998");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e) =>{
    e.preventDefault();
    dispatch(signingUser());
    const res = await axiosInstance.post('/user/signup',{
      fullName,
      userName,
      email,
      password,
      role:"admin",
      contactNumber
    });

    if(res.status === 201){
      const token = res.headers['x-auth-token'];
      localStorage.setItem("token",token);
      const userData = {
          ...res.data,
          token: token
      }
      console.log("Response " ,userData);
      dispatch(signupUser(userData));
      navigate('/');
    }else{
        dispatch(signingUser());
    }

  }



  return (
    <div
      style={{
        width: "100%",
        display: "grid",
        placeItems: "center",
        padding: "50px",
      }}
    >
      <div style={{ width: "400px" }}>
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label for="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              placeholder="Your Name"
              value={fullName}
              onChange={e=>setFullname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label for="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={userName}
              onChange={e=>setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="contact" className="form-label">
              Contact Number
            </label>
            <input
              type="alphanumeric"
              className="form-control"
              id="contact"
              placeholder="Contact"
              value={contactNumber}
              onChange={e=>setContact(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
