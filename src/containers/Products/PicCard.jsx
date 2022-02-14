import React,{useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../../css/PicCard.css';

const PicCard = ({url,big,removePic,id}) => {
    const [showCancel,setShowCancel] = useState(false);

    return ( 
        <div className='PicCard' style={{height:`${big?"450px":"200px"}`}} onMouseEnter={()=>setShowCancel(true)} onMouseLeave={()=>setShowCancel(false)}>
            
            {showCancel &&  
            <div className='pcancel' onClick={()=>removePic(id)}>
                <CloseIcon style={{fontSize:'25px'}}/>
            </div>
            }
            <img src={URL.createObjectURL(url)} alt="Pic" style={{height:`${big?"530px":"280px"}`,width:"120%",borderRadius:"10px"}}/>
        </div> 
    );
}
 
export default PicCard;