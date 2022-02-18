import React,{useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../../css/PicCard.css';

const PicCard = ({url,big,removePic,id}) => {
    const [showCancel,setShowCancel] = useState(false);

    return ( 
        <div className='PicCard' style={{height: "400px",display:"grid",placeItems:"center",margin:"5px"}} onMouseEnter={()=>setShowCancel(true)} onMouseLeave={()=>setShowCancel(false)}>
            
            {showCancel &&  
            <div className='pcancel' onClick={()=>removePic(id)}>
                <CloseIcon style={{fontSize:'25px'}}/>
            </div>
            }
            <img src={URL.createObjectURL(url)} alt="Pic" style={{width:"100%",borderRadius:"10px"}}/>
        </div> 
    );
}
 
export default PicCard;