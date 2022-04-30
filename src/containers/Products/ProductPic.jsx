import React from 'react';

const ProductPic = ({url}) => {
    return ( 
        <div style={{height:"100px",width:"100px",margin:"5px",borderRadius:"4px",display:"grid",placeItems:"center",overflow:"hidden"}}>
            <img src={`https://mern-ecommerce-products-images.s3.amazonaws.com/${url}` } alt="pic" style={{maxHeight:"100%",maxWidth:"100%",borderRadius:"4px",objectFit:"contain"}}/>
            
        </div>
    );
}
 
export default ProductPic;