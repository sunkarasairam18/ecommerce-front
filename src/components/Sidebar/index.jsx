import React from 'react';
import '../../css/Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return ( 
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/admin">Home</Link>
                </li>
                <li>
                    <Link to="/admin/products">Products</Link>
                </li>
                <li>
                    <Link to="/admin/orders">
                        Orders
                    </Link>
                </li>
                <li>
                    <Link to="/admin/category">
                        Category
                    </Link>
                </li>
            </ul>
        </div>
    );
}
 
export default Sidebar;