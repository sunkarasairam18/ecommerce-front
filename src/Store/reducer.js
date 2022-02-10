import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "user",
    initialState: {
        data: {
            _id:"",
            userName: "",
            email: "",
            role: "",
            token: localStorage.getItem("token")?localStorage.getItem("token"):""
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
        setUserDetails: (user,action)=>{
            user.data = {
                ...action.payload,
                token: user.data.token
            }
            // user.data = action.payload;
        },
        signOutUser: (user,action)=>{
            localStorage.clear();
            user.data = {
                _id:"",
                userName: "",
                email: "",
                role: "",
                token: ""
            };
            user.authenticate = false;
        },
        signupUser: (user,action)=>{
            user.data = {...action.payload};
            user.authenticating = false;
            user.authenticate = true;
        }
        
    }
});



export const {setUserDetails,signInUser,signingUser,signOutUser,signupUser} = slice.actions;
export default slice.reducer;