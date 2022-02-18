import React from 'react';

const ProductPic = ({url}) => {
    return ( 
        <div style={{height:"100px",width:"100px",margin:"5px",borderRadius:"4px",display:"grid",placeItems:"center",overflow:"hidden"}}>
            <img src={`http://localhost:3000/public/${url}` } alt="pic" style={{height:"90%",width:"100%",borderRadius:"4px"}}/>
            
        </div>
    );
}
 
export default ProductPic;