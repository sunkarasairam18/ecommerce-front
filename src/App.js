import React,{useState,useEffect} from 'react';
import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Header from './components/Header';
import { setUserDetails } from './Store/reducer';
import { useSelector,useDispatch } from 'react-redux';
import { axiosInstance } from './api/axios';
import Products from './containers/Products';
import Sidebar from './components/Sidebar';


function App() {
  // const [token,setToken] = useState("");
  const dispatch = useDispatch();
  const ticket = useSelector(state => state.user.data.token);
  const id = useSelector(state => state.user.data._id);

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

  return (
    <div className="App">
        <Header ticket={ticket}/>
             
        <Routes>         
          <Route path="/admin/*" element={ticket?<Home/>:<Navigate to="/signin" replace={true}/>}/> 
          {/* <Route path="/products" element={ticket?<Products/>:<Navigate to="/signin" replace={true}/>}/> */}
          <Route path="/signin" element={ticket?<Navigate to="/" replace={true}/>:<SignIn/>}/>
          <Route path="/signup" element={ticket?<Navigate to="/" replace={true}/>:<SignUp/>}/>
          <Route exact path="/" element={<Navigate to="/admin" replace={true}/>}/>
        </Routes>
          
    </div>
  );
}

export default App;
