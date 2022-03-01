import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import { Modal,Form,Row,Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const Page = () => {

    const [createModal,setCreateModal] = useState(false);
    const [title,setTitle] = useState('');
    const [categoryId,setCategoryId] = useState("");
    const [desc,setDesc] = useState('');
    const [banners,setBanners] = useState([]);
    const [products,setProducts] = useState([]);
    const [catList,setCatList] = useState([]);

    const categories = useSelector(state => state.user.categories);


    useEffect(()=>{
        setCatList(createCategoryList(categories));
    },[categories]);

    const createCategoryList = (catlist,options=[])=>{
        for(let cat of catlist){
            options.push({value: cat._id,name: cat.name,parentId: cat.parentId,type: cat.type});
            if(cat.children.length>0){
                createCategoryList(cat.children,options);
            }
        }    
        return options;
    };

    function handleClose(){
        setCreateModal(false);
    };

    const handleBanners = (e) =>{
        if(e.target.files[0]) setBanners([...banners,e.target.files[0]]);
    };
    
    const handleProductPics = (e)=>{
        if(e.target.files[0]) setProducts([...products,e.target.files[0]]);
    };
    

    return ( 
        <div>
            <Modal show={createModal} onHide={handleClose}>
                <Modal.Header closeButton style={{paddingLeft:"20px",paddingRight:"20px",paddingTop:"10px",paddingBottom:"10px"}}>
                <Modal.Title>Create New Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Select value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}>
                                <option>select category</option>
                                {
                                    catList.map(cat => 
                                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                                    )
                                }
                            </Form.Select>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"5px"}}>
                        <Col>
                            <Form.Control type="text" placeholder="Page Title" value={title} onChange={e=>setTitle(e.target.value)}/>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"5px"}}>
                        <Col>
                            <Form.Control type="text" placeholder="Page Description" value={desc} onChange={e=>setDesc(e.target.value)}/>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"-5px"}}>
                        <Col>
                            <Form.Control type="file" style={{marginTop:"10px"}} accept="image/*" onChange={handleBanners}/>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"-5px"}}>
                        <Col>
                            <Form.Control type="file" style={{marginTop:"10px"}} accept="image/*" onChange={handleProductPics}/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer style={{padding:"3px"}}>
                <div style={{display:"flex",width:"50%",justifyContent:"space-around"}}>
                    <Button variant="contained" color="success" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="contained" color="success" onClick={handleClose}>
                        Save Changes
                    </Button>
                </div>
                </Modal.Footer>
            </Modal>
            <Button variant="contained" color="success" onClick={()=>setCreateModal(true)}>
                Create Page
            </Button>
        </div>
     );
}
 
export default Page;