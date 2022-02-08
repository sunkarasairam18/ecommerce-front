import { createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../api/axios";

const slice = createSlice({
    name: "user",
    initialState: {
        data: {
            _id:"",
            userName: "",
            email: "",
            role: "",
            token: JSON.stringify(localStorage.getItem("token"))
        },
        authenticate: false,
        authenticating: false
    },
    reducers: {        
        signInUser: (user,action) =>{
            user.data = {...action.payload};
            user.authenticating = false;
            user.authenticate = true;
        },
        signingUser: (user,action) =>{
            user.authenticate = !user.authenticate;
        },
        setToken: (user,action)=>{
            console.log("Action : ",action.payload);
            user.data.token = action.payload.token;
        }
        
    }
});



export const {setToken,signInUser,signingUser} = slice.actions;
export default slice.reducer;