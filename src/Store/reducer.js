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
        products: [],        
        toast: {
            msg: "",
            show: false,
            severity: ""
        }
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
        setToast : (user,action)=>{
            user.toast = {
                msg: action.payload.msg,
                show: true,
                severity: action.payload.severity
            }
        },
        closeToast : (user,actin)=>{
            user.toast.show = false; 
        },
        setProducts: (user,action)=>{
            var i = 1;
            user.products = action.payload.map(product => {
                product.serial = i++;
                return product
            });
        }
        
    }
});



export const {setUserDetails,signInUser,signingUser,signOutUser,signupUser,setCategories,setProducts,setToast,closeToast} = slice.actions;
export default slice.reducer;