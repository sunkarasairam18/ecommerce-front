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
        authenticating: false,
        categories: [],
        toastMsg: "",
        showToast: false
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
        },
        setCategories: (user,action)=>{
            user.categories = [...action.payload];
        },
        setShowToast: (user,action)=>{
            user.showToast = action.payload.showToast;
        },
        setToastMsg: (user,action)=>{
            user.toastMsg = action.payload.toastMsg;
        }
        
    }
});



export const {setUserDetails,signInUser,signingUser,signOutUser,signupUser,setCategories,setShowToast,setToastMsg} = slice.actions;
export default slice.reducer;