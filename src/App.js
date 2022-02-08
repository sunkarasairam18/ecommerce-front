import React,{useState,useEffect} from 'react';
import './App.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Header from './components/Header';
import { setToken } from './Store/reducer';
import { useSelector,useDispatch } from 'react-redux';

function App() {
  // const [token,setToken] = useState("");
  const dispatch = useDispatch();
  const ticket = useSelector(state => state.user.data.token);

  useEffect(()=>{
    if(!ticket){
      const local = localStorage.getItem("token");
      if(local){
        dispatch(setToken({token: JSON.stringify(local)}));
      }
    }
  },[]);

  const define = () =>{
    console.log(ticket);
    console.log(ticket?true:false);
    if(ticket == null) return <Navigate to='/signin' replace={true}/>;
    return <Home/>;
  }

  return (
    <div className="App">
        <Header/>
        <div>{ticket}</div>
        <Routes>          
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>

          <Route path="/" element={define()}/>
        </Routes>
    </div>
  );
}

export default App;
