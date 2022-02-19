import React, { useState } from "react";
import "../../css/Category.css";
import { Modal,Form } from "react-bootstrap";
import { axiosInstance } from "../../api/axios";
import { useSelector,useDispatch } from "react-redux";
import { setToast } from "../../Store/reducer";
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {Row,Col} from 'react-bootstrap';
import Button from '@mui/material/Button';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const Category = () => {
  const [categoryName,setCategoryName] = useState("");
  const [categoryParentId,setCategoryParentId] = useState("");
  const [categoryImage,setCategoryImage] = useState();
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const [checked,setCheck] = useState([]);
  const [expanded,setExpand] = useState([]);
  const [checkedArray,setCheckedArray] = useState([]);
  const [expandedArray,setExpandedArray] = useState([]);
  const [updateCategory,setUpdateCategory] = useState(false);

  const categories = useSelector(state => state.user.categories);

  const handleClose = () => {
    setCategoryName("");
    setCategoryParentId("");
    setCategoryImage();
    setShow(false);
  };

  async function addCategory(form){
    const res = await axiosInstance.post("/category/create",form);
    if(res.status === 201){
        console.log("Created");
        handleClose();
        dispatch(setToast({msg:"Category Created Successfully",severity:"success"}))        
    }else{
      handleClose();      
      dispatch(setToast({msg:"Couldn't Add Product",severity:"warning"}))
    }
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    const form = new FormData();

    form.append('name',categoryName);
    form.append('parentId',categoryParentId);
    form.append('categoryImage',categoryImage);
    addCategory(form);
  };

  const handleShow = () =>{
    setShow(true);
  };



  const renderCategories = (categorylist) => {
    if (!categorylist || categorylist.length === 0) return;

    let myCategories = [];
    for(let cat of categorylist){
      myCategories.push(
        {
          label: cat.name,
          value: cat._id,
          children: cat.children.length>0 && renderCategories(cat.children)
        }
      );
    }

    // categorylist.map((category) => (


      // <li key={category.name}>
      //   {category.name}
      //   {category.children.length > 0 && (
      //     <ul>{renderCategories(category.children)}</ul>
      //   )}
      // </li>
    // ));
    return myCategories;
  };

  const createCategoryList = (catlist,options=[])=>{
    for(let cat of catlist){
        options.push({value: cat._id,name: cat.name,parentId: cat.parentId});
        if(cat.children.length>0){
            createCategoryList(cat.children,options);
        }
    }

    return options;
  };


  const handleCategoryImage = (e) =>{
    setCategoryImage(e.target.files[0]);
  };

  const handleUpdateCategory = (e) =>{
    e.preventDefault();
    const categorylist = createCategoryList(categories);
    if(checked.length === 0 && expanded.length === 0){
      dispatch(setToast({msg:"Nothing was selected or expanded",severity:"error"}));
      return;
    }
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((categoryId,index)=>{
      const category = categorylist.find((category,_index)=> categoryId === category.value )
      category && checkedArray.push(category);
    }); 

    expanded.length > 0 && expanded.forEach((categoryId,index)=>{
      const category = categorylist.find((category,_index)=> categoryId === category.value )
      category && expandedArray.push(category);
    }); 
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    setUpdateCategory(true);

  }

  const handleCategoryInput = (key,value,index,type) =>{
    if(type === "checked"){
      const updatedCheckedArray = checkedArray.map((item,_index) => index === _index? {...item,[key]:value}:item);
      setCheckedArray(updatedCheckedArray);
    }else if(type === "expanded"){
      const updatedExpandedArray = expandedArray.map((item,_index) => index === _index? {...item,[key]:value}:item);
      setExpandedArray(updatedExpandedArray);
    }
  }

  async function updateCategories (form){
    const res = await axiosInstance.post("/category/update",form);
    if(res.status === 200){
        console.log("Updated",res.data);
        // handleClose();
        //    
        setUpdateCategory(false);
        dispatch(setToast({msg:"Categories Updated",severity:"success"}));
        setExpandedArray([]);
        setCheckedArray([]);

    }else{
      console.log("Not updated");
      setUpdateCategory(false);
      dispatch(setToast({msg:"Couldn't Update ",severity:"error"}));
    }
    

  };

  const updateCategoriesForm = (e) =>{
    e.preventDefault();
    const form = new FormData();
    expandedArray.forEach((item,index)=>{
      form.append('_id',item.value);
      form.append('name',item.name);
      form.append('parentId',item.parentId ? item.parentId:"");
      form.append('type',item.type);

    });
    checkedArray.forEach((item,index)=>{
      form.append('_id',item.value);
      form.append('name',item.name);
      form.append('parentId',item.parentId ? item.parentId:"");
      form.append('type',item.type);

    });
    updateCategories(form);



  }

  return (
    <div className="category">
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Control value={categoryName} type="text" placeholder="Category Name" onChange={e=>setCategoryName(e.target.value)}/>
            <Form.Select value={categoryParentId} style={{marginTop:"10px"}} onChange={e=>setCategoryParentId(e.target.value)}>
                <option value="">select category</option>
                {categories && categories.length>0 &&
                    createCategoryList(categories).map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.name}</option>
                    ))
                }
            </Form.Select>
            <Form.Control type="file" style={{marginTop:"10px"}} accept="image/*" onChange={handleCategoryImage}/>
         
           
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit categories */}
      <Modal show={updateCategory} onHide={()=>setUpdateCategory(false)} size="lg" animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Update Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{maxHeight:"400px",overflow:"scroll"}}>
          {
          expandedArray.length > 0 &&<Row>
          <Col>
            <h6>Expanded</h6>
          </Col>
        </Row>   }
        {
          expandedArray.length > 0 &&
          expandedArray.map((item,index)=>
            <Row key={index}  style={{marginBottom:"10px"}}>
            <Col>
              <Form.Control value={item.name} type="text" placeholder="Category Name" onChange={(e)=>handleCategoryInput('name',e.target.value,index,"expanded")}/>
            </Col>
            <Col>
            <Form.Select value={item.parentId} onChange={(e)=>handleCategoryInput('parentId',e.target.value,index,"expanded")}>
                <option value="">select category</option>
                {categories && categories.length>0 &&
                    createCategoryList(categories).map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.name}</option>
                    ))
                }
            </Form.Select>
            </Col>
            <Col>
              
              <Form.Select>
                <option value="">Select Type</option>
                <option value="store">Store</option>
                <option value="store">Product</option>
                <option value="store">Page</option>
              </Form.Select>
            </Col>
            </Row>
          )
        }
        {
          checkedArray.length > 0 &&
          <Row>
          <Col>
            <h6>Checked</h6>
          </Col>
          </Row>   }
            {
            checkedArray.length > 0 &&
            checkedArray.map((item,index)=>
              <Row key={index}  style={{marginBottom:"10px"}}>
              <Col>
                <Form.Control value={item.name} type="text" placeholder="Category Name" onChange={(e)=>handleCategoryInput('name',e.target.value,index,"checked")}/>
              </Col>
              <Col>
              <Form.Select value={item.parentId} onChange={(e)=>handleCategoryInput('parentId',e.target.value,index,"checked")}>
                  <option value="">select category</option>
                  {categories && categories.length>0 &&
                      createCategoryList(categories).map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.name}</option>
                      ))
                  }
              </Form.Select>
              </Col>
            <Col>
              
              <Form.Select>
                <option value="">Select Type</option>
                <option value="store">Store</option>
                <option value="store">Product</option>
                <option value="store">Page</option>
              </Form.Select>
            </Col>
            </Row>
          )
        }
          </div>
        
       
        </Modal.Body>
        <Modal.Footer>
          <Button variant="contained" color="success" onClick={updateCategoriesForm}>
            Save Changes
          </Button>         
        </Modal.Footer>
      </Modal>

     
      <div className="cheader">
        <h3>Category</h3>
        <div style={{display:"flex",justifyContent:"space-between",width:"20%"}}>
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Delete
        </Button>
        <Button variant="contained" color="success" onClick={handleUpdateCategory}>
          Edit
        </Button>
        <Button variant="contained" color="success" onClick={()=>handleShow()}>
          Add
        </Button>
        </div>
      </div>
      <div className="ccontent">   
        <div className="ccin">
          {/* {categories && <ul>{renderCategories(categories)}</ul>} */}

          <CheckboxTree
            nodes={renderCategories(categories)}
            checked={checked}
            expanded={expanded}
            onCheck={checked => setCheck(checked)}
            onExpand={expanded => setExpand(expanded)}
            icons={{
              check: <CheckBoxIcon/>,
              uncheck: <CheckBoxOutlineBlankIcon/>,
              halfCheck: <CheckBoxOutlineBlankIcon/>,
              expandClose: <KeyboardArrowRightIcon/>,
              expandOpen: <KeyboardArrowDownIcon/>
            }}
          />
        </div>
        
        {/* <div className="ccin">
          s
        </div> */}
        {/* {categories && <ul>{renderCategories(categories)}</ul>} */}
        

        
         
         

         
      </div>
    </div>
  );
};

export default Category;
