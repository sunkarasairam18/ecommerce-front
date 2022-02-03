import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const user = useSelector((state) => state.user);

    return ( 
        <div style={{margin:"5rem",background:"white"}} className="text-center">
            <h1>Welcome to Admin Dashboard</h1>
            <h2>{user.name}</h2>
        </div>
     );
}
 
export default Home;