import React,{useEffect,useState} from 'react';
import  '../../css/Products.css';
import { Modal,Form } from 'react-bootstrap';
import { axiosInstance } from '../../api/axios';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import Alert from '@mui/material/Alert';

import PicsBasket from './PicsBasket';
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from "react-redux";
import { setShowToast,setToastMsg } from "../../Store/reducer";




const Products = () => {
    const [productName,setProductName] = useState("");
    const [show,setShow] = useState(false);
    const [quantity,setQuantity] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");
    const [categoryParentId,setCategoryParentId] = useState("");
    const [productPics,setProductPics] = useState([]);
    
    const dispatch = useDispatch();
    const showToast = useSelector(state => state.user.showToast);
    const toastMsg = useSelector(state => state.user.toastMsg);

    const categories = useSelector(state => state.user.categories);

    const handleShow = () =>{
        setShow(true);
    };

    const handleClose = () =>{
        setProductName("");
        setShow(false);
        setQuantity(false);
        setPrice("");
        setCategoryParentId("");
        setProductPics([]);
        setDescription("");
        setShow(false);
    };

    const handleProductPic = (e) =>{
        if(e.target.files[0]) setProductPics([...productPics,e.target.files[0]]);
    };

    async function addProduct(form){
        const res = await axiosInstance.post("/product/create",form);
        if(res.status === 201){
            console.log("Created");
            handleClose();           
            dispatch(setToastMsg({toastMsg:"Product Added Succesfully"}));
            dispatch(setShowToast({showToast:true}));
        }else{
            handleClose();
            dispatch(setToastMsg({toastMsg:"Couldn't Add Product"}));
            dispatch(setShowToast({showToast:true}));
        }
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        const form = new FormData();
        form.append('name',productName);
        form.append('quantity',quantity);
        form.append('price',price);
        form.append('description',description);
        form.append('category',categoryParentId);
        for(let pic of productPics){
            form.append("productPicture",pic);
        }
        addProduct(form);
        
    };   


    const createCategoryList = (catlist,options=[])=>{
        for(let cat of catlist){
            options.push({value: cat._id,name: cat.name});
            if(cat.children.length>0){
                createCategoryList(cat.children,options);
            }
        }    
        return options;
    };

   
    
    const removePic = (id) =>{
        setProductPics(productPics.filter(product => product != id));
    };

    return ( 
        <div className='products'>            
            <Modal show={show} onHide={handleClose} scrollable={true} animation={false}>
                <Modal.Header closeButton>
                <Modal.Title>Add New Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label htmlFor="productName">Name</Form.Label>
                    <Form.Control value={productName} type="text" id="productName" placeholder="Product Name" onChange={e=>setProductName(e.target.value)}/>   
                    <Form.Label htmlFor="quantity">Quantity</Form.Label>
                    <Form.Control value={quantity} type="text" id="quantity" placeholder="Quantity" onChange={e=>setQuantity(e.target.value)}/>   
                    <Form.Label htmlFor="price">Price</Form.Label>
                    <Form.Control value={price} type="text" id="price" placeholder="Price" onChange={e=>setPrice(e.target.value)}/>   
                    <Form.Label htmlFor="description">Description</Form.Label>
                    <Form.Control value={description} type="text" id="description" placeholder="Enter Description" onChange={e=>setDescription(e.target.value)}/>   
                    <Form.Select value={categoryParentId} style={{marginTop:"10px"}} onChange={e=>setCategoryParentId(e.target.value)}>
                        <option value="">select category</option>
                        {categories && categories.length>0 &&
                            createCategoryList(categories).map(cat => (
                                <option key={cat.value} value={cat.value}>{cat.name}</option>
                            ))
                        }
                    </Form.Select>
                    <Form.Control type="file" style={{marginTop:"10px"}} accept="image/*" onChange={handleProductPic}/>
                    {/* productPic.length>0 && productPic.map((pic,index)=><div key={index}>{JSON.stringify(pic)}</div>) */}
                    
                    {productPics.length>0 && <PicsBasket productPics={productPics} removePic={removePic}/>}
                    
                </Modal.Body>
                <Modal.Footer>
                <Button variant="contained" color="success" onClick={handleSubmit}>
                    Add Product
                </Button>
                </Modal.Footer>
            </Modal>
            <Snackbar
                open={showToast}
                onClose={()=>setShowToast(false)}
                TransitionComponent={Slide}
                message={toastMsg}
                autoHideDuration={3000}
                key={'created'}
                disableWindowBlurListener={true}
                sx={{ width: "350px" }}
            >
                <Alert onClose={()=>setShowToast(false)} variant="filled" severity="success" sx={{ width: '100%' }} >
                {toastMsg}
                </Alert>
            </Snackbar>
            <div className="pheader">
                <h3>Products</h3>
                <Button variant="contained" color="success" onClick={()=>handleShow()}>
                Add
                </Button>
            </div>
            <div className="pcontent">       
                {/* <ul>{renderCategories(categories)}</ul> */}
            </div>
        </div>
    );
}
 
export default Products;