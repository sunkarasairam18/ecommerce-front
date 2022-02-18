import React from 'react';
import '../../css/PicsBasket.css';
import PicCard from './PicCard';

const PicsBasket = ({productPics,removePic}) => {

    

    const renderPics = () =>{
        var component = [];
        var l = productPics.length;       
        
        for(var i = 0;i<l;i++){
            component.push(
            <div className='prow' key={productPics[i]}>
                    <PicCard url={productPics[i]} big={true} id={productPics[i]} removePic={removePic}/>              
            </div>);        
        }

        return component;
    };

    return ( 
        <div className='picsbasket'>
            
            {
                    renderPics()
                }
        </div>
    );
}
 
export default PicsBasket;