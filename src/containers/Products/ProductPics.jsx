import React from 'react';
import ProductPic from './ProductPic';
import {Row} from 'react-bootstrap';
import '../../css/ProductPics.css';

const ProductPics = ({list}) => {

    return ( 
        <div className='productpics'>
            <div className='pics'>
                {list.map(pic => <ProductPic url={pic.img} />)}
            </div>
        </div>
     );
}
 
export default ProductPics;