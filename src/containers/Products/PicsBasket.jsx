import React from 'react';
import '../../css/PicsBasket.css';
import PicCard from './PicCard';
import { Container,Row,Col } from 'react-bootstrap';

const PicsBasket = ({productPics,removePic}) => {

    

    const renderPics = () =>{
        var component = [];
        var l = productPics.length;
        var limit;
        if(l%2 === 0){
            limit = l;
        }else{
            limit = l-1;
        }
        
        for(var i = 0;i<limit;i+=2){
            component.push(
            <div className='prow' >
                <div className='pbhalf'>
                    <PicCard url={productPics[i]} big={false} id={productPics[i]} removePic={removePic}/>
                </div>
                <div className='pbhalf'>
                    <PicCard url={productPics[i+1]} big={false} id={productPics[i+1]} removePic={removePic}/>
                </div>
            </div>);        
        }

        if(l%2 !== 0){
            component.push(
                <div className='prow'>
                    <div className='pfull'>
                        <PicCard url={productPics[l-1]} big={true} id={productPics[l-1]} removePic={removePic}/>

                    </div>
                </div>
                );
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