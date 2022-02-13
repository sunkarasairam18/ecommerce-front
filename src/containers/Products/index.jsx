import React,{useEffect,useState} from 'react';
import  '../../css/Products.css';
import { Button } from 'react-bootstrap';
import io from "socket.io-client";

// const socket = io.connect("http://localhost:3000");



const Products = () => {

    // function sendSocketIO(e) {
    //     e.preventDefault();
    //     socket.emit('example_message', 'demo');
    // }


    // useEffect(() => {
    //     const newSocket = io.connect(`http://localhost:3000/`);
    //     setSocket(newSocket);
    //     return () => newSocket.close();
    // }, [setSocket]);

    // if(socket) socket.emit("example_message","demo");

    // useEffect({
        
    // },[]);

    return ( 
        <div className='products'>            
            Products
            <Button variant="primary">Primary</Button>
        </div>
    );
}
 
export default Products;