import React,{useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import { Modal,Form,Row,Col } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { setToast } from '../../Store/reducer';
import { axiosInstance } from "../../api/axios";

const Page = () => {

    const [createModal,setCreateModal] = useState(false);
    const [title,setTitle] = useState('');
    const [categoryId,setCategoryId] = useState("");
    const [desc,setDesc] = useState('');
    const [type,setType] = useState("");
    const [banners,setBanners] = useState([]);
    const [products,setProducts] = useState([]);
    const [catList,setCatList] = useState([]);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.user.categories);


    useEffect(()=>{
        setCatList(createCategoryList(categories));
    },[categories]);

    const createCategoryList = (catlist,options=[])=>{
        for(let cat of catlist){
            options.push({_id: cat._id,name: cat.name,parentId: cat.parentId,type: cat.type});
            if(cat.children.length>0){
                createCategoryList(cat.children,options);
            }
        }    
        return options;
    };

    function handleClose(){
        setCreateModal(false);
        setTitle("");
        setCategoryId("");
        setDesc("");
        setType("");
        setBanners([]);
        setProducts([]);
        
    };

    const handleBanners = (e) =>{
        if(e.target.files[0]) setBanners([...banners,e.target.files[0]]);
    };
    
    const handleProductPics = (e)=>{
        if(e.target.files[0]) setProducts([...products,e.target.files[0]]);
    };
    
    

    const onCategoryChange = (e) =>{
        const category = categories.find(category => category._id === e.target.value);
        setCategoryId(e.target.value);
        setType(category.type);
    };

    const createPage = async (form) =>{
        const res = await axiosInstance.post('/page/create',form);
        if(res.status === 201){
            handleClose();
            dispatch(setToast({msg:"Page Created",severity:"success"}));
        }else{
            handleClose();
            dispatch(setToast({msg:"Couldn't Create Page",severity:"warning"}));        
        }
    };

    const handleSave = (e) =>{
        e.preventDefault();
        const form = new FormData();
        form.append("title",title);
        form.append("description",desc);
        form.append("category",categoryId);
        form.append("type",type);

        banners.forEach((banner,index)=>{
            form.append('banners',banner);
        });
        products.forEach((product,index)=>{
            form.append('products',product);            
        });
        console.log({title,desc,categoryId,type});
        createPage(form);
        // console.log(form);
    }


    return ( 
        <div>
            <Modal show={createModal} onHide={handleClose}>
                <Modal.Header closeButton style={{paddingLeft:"20px",paddingRight:"20px",paddingTop:"10px",paddingBottom:"10px"}}>
                <Modal.Title>Create New Page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Form.Select value={categoryId} onChange={onCategoryChange}>
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
                        {
                            banners.length>0 && 
                            banners.map((banner,index)=>
                              <Row key={index}>
                                  <Col>{banner.name}</Col>
                              </Row>
                            )
                        }
                    </Row>
                    <Row style={{marginTop:"-5px"}}>
                        <Col>
                            <Form.Control type="file" style={{marginTop:"10px"}} accept="image/*" onChange={handleProductPics}/>
                        </Col>
                        {
                            products.length>0 && 
                            products.map((product,index)=>
                              <Row key={index}>
                                  <Col>{product.name}</Col>
                              </Row>
                            )
                        }
                    </Row>
                </Modal.Body>
                <Modal.Footer style={{padding:"3px"}}>
                <div style={{display:"flex",width:"50%",justifyContent:"space-around"}}>
                    
                    <Button variant="contained" color="success" onClick={handleSave}>
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