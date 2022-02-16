import React from 'react';

const ProductPic = ({url}) => {
    return ( 
        <div style={{borderStyle:"solid",borderWidth:"1px",borderColor:"grey",margin:"5px",borderRadius:"4px"}}>
            <img src={`http://localhost:3000/public/${url}` } style={{height:"200px",width:"180px",borderRadius:"4px"}}/>
            
        </div>
    );
}
 
export default ProductPic;