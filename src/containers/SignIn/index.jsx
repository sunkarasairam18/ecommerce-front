import React, { useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { signInUser,signingUser } from "../../Store/reducer";
import { axiosInstance } from '../../api/axios';
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [email, setEmail] = useState("vamsi@gmail.com");
    const [pwd, setPwd] = useState("@ab17@vk18");
    const [err, setErr] = useState();

    const handleSignIn = async (e) =>{
      e.preventDefault();
      dispatch(signingUser());
      const res = await axiosInstance.post('/user/signin',{
        email: email,
        password: pwd
      });

      if(res.status === 200){
        const {_id,userName,email,role} = res.data;
        
        localStorage.setItem("token",res.headers['x-auth-token']);
        const userData = {
          _id,userName,email,role,
          token: res.headers['x-auth-token']         
        };
        dispatch(signInUser(userData));
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
        <form onSubmit={handleSignIn}>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={e=>setEmail(e.target.value)}
            />
            <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              value={pwd}
              onChange={e=>setPwd(e.target.value)}
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      {JSON.stringify(user)}
    </div>
  );
};

export default SignIn;
