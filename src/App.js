import React,{useState,useEffect} from 'react';
import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Header from './components/Header';
import { setUserDetails,setCategories,setProducts,closeToast } from './Store/reducer';
import { useSelector,useDispatch } from 'react-redux';
import { axiosInstance } from './api/axios';
import io from 'socket.io-client';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';
import Page from './containers/Page';


function App() {
  const [ socket,setSocket] = useState(null);
  const dispatch = useDispatch();
  const ticket = useSelector(state => state.user.data.token);
  const id = useSelector(state => state.user.data._id);
  const showToast = useSelector(state => state.user.toast.show);
  const toastMsg = useSelector(state => state.user.toast.msg);
  const severity = useSelector(state => state.user.toast.severity); 
  const categories = useSelector(state => state.user.categories);
  // const products = useSelector(state => state.user.products);

  useEffect(()=>{
    if(ticket) setSocket(io.connect("http://localhost:3000"));    
  },[ticket])

  useEffect(() => {
    return () => {
      console.log("cleaned up");
      if(socket) socket.disconnect();
    };
  }, []);

  

  async function getProfile(local){
    const res = await axiosInstance.get('/user/profile');
    if(res.status == 200){
      console.log("Data : ",res.data);
      const {_id,userName,email,role} = res.data;
      return {_id,userName,email,role};
    }else{
      return 1;
    }
  }

  useEffect(()=>{
    if(ticket && !id){
      
      axiosInstance.get('/user/profile').then(res => {
        if(res.status == 200){
          const {_id,userName,email,role} = res.data;
          dispatch(setUserDetails({_id,userName,email,role}));
        }
      }).catch(err => {
        console.log("Couldnt set up user");
      });            
    }
  },[ticket,id]);

  // const define = () =>{
  //   console.log(ticket);
  //   console.log(ticket == true?true:false);
  //   if(ticket == null) return <Navigate to='/signin' replace={true}/>;
  //   return <Home/>;
  // }

  async function getCategories() {
    const res = await axiosInstance.get("/category/get");
    if (res.status === 200) {
      dispatch(setCategories(res.data));       
    }
  }

  async function getProducts() {
    const res = await axiosInstance.get("/product/get");
    if (res.status === 200) {
      dispatch(setProducts(res.data));       
    }else{
      console.log(res);
    }
  }


  useEffect(() => {    
    if(ticket){
      getCategories();
    }    
  }, [ticket]);

  useEffect(()=>{
    if(ticket && categories.length>0){
      getProducts();
      console.log("Fetching products");
    }
  },[ticket,categories]);

  useEffect(()=>{
    if(socket && ticket){
      socket.on("products_change",(data)=>{
        console.log(data);
        getProducts();
      });
      socket.on("categories_change",(data)=>{
        console.log(data);
        getCategories();
      });
    }
  },[socket]);

  return (
    <div className="App">
       
        <div className='head'>
          <Header ticket={ticket}/>

        </div>

        <div className='body'
        >
           <Routes>         
            <Route path="/admin/*" element={ticket?<Home/>:<Navigate to="/signin" replace={true}/>}/> 
            <Route path="/signin" element={ticket?<Navigate to="/" replace={true}/>:<SignIn/>}/>
            <Route path="/signup" element={ticket?<Navigate to="/" replace={true}/>:<SignUp/>}/>
            <Route exact path="/" element={<Navigate to="/admin" replace={true}/>}/>
          </Routes>
        </div>
        <Snackbar
            open={showToast}
            onClose={()=>dispatch(closeToast({}))}
            TransitionComponent={Slide}
            message={toastMsg}
            autoHideDuration={3000}
            key={'created'}
            disableWindowBlurListener={true}
            sx={{ width: "350px" }}
        >
            <Alert onClose={()=>dispatch(closeToast({}))} variant="filled" severity={severity} sx={{ width: '100%' }} >
            {toastMsg}
            </Alert>
        </Snackbar>
    </div>
  );
}

export default App;
