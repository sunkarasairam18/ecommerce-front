import React from 'react';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>          
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/" element={<Home/>}/>
        </Routes>
    </div>
  );
}

export default App;
