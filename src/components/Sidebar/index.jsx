import React,{useState} from 'react';
import '../../css/Sidebar.css';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
    const navigate = useNavigate();
    const [click,setClick] = useState(window.location.pathname.split('/').pop());

    const handleClick = (route,id) =>{
        setClick(id);
        navigate(route);
    };

    const selectClass = (num) =>{
        return 'link '+`${num === click?"select":""}`;
    };

    return ( 
        <div className="sidebar">
            <div className={selectClass('admin')} onClick={()=>handleClick('/admin','admin')}>
                Home
            </div>

            <div className={selectClass('products')} onClick={()=>handleClick('/admin/products','products')}>
                Products
            </div>

            <div className={selectClass('orders')} onClick={()=>handleClick('/admin/orders','orders')}>
                
                Orders
            </div>

            <div className={selectClass('category')} onClick={()=>handleClick('/admin/category','category')}>
               
                Category
            </div>
            <div>
            </div>
            
        </div>
    );
}
 
export default Sidebar;