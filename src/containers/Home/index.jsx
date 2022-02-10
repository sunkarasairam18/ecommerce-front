import React from 'react';

import '../../css/Home.css';
import { Routes,Route,Navigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';
import Products from '../Products';
import Orders from '../Orders';
import Category from '../Category';

const Home = ({}) => {
    const ticket = useSelector(state => state.user.data.token);
    
    return ( 
        <div className='home'>
            <div className='main'>            
            <Sidebar/>
            <div className='board'> 

            <Routes>
                <Route path="/" element={<div>Home</div>}/>
                <Route path="/products" element={<Products/>}/>
                <Route path="/orders" element={<Orders/>}/>
                <Route path="/category" element={<Category/>}/>
            </Routes>
      
                
            </div>
            </div>
               
        </div>
     );
}
 
export default Home;