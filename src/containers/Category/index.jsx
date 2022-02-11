import React, { useState, useEffect } from "react";
import "../../css/Category.css";
import { Button } from "react-bootstrap";
import { Modal,Form,Toast,ToastContainer } from "react-bootstrap";
import { axiosInstance } from "../../api/axios";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName,setCategoryName] = useState("");
  const [categoryParentId,setCategoryParentId] = useState("");
  const [categoryImage,setCategoryImage] = useState();
  const [show, setShow] = useState(false);
  const [showToast,setShowToast] = useState(false);

  const handleClose = () => {
    setCategoryName("");
    setCategoryParentId("");
    setCategoryImage();
    setShow(false);
  };

  async function addCategory(form){
    const res = await axiosInstance.post("/category/create",form);
    if(res.status == 201){
        console.log("Created");
        setShowToast(true);
    }
  };

  const handleSubmit = (e) =>{
    e.preventDefault();
    const form = new FormData();

    form.append('name',categoryName);
    form.append('parentId',categoryParentId);
    form.append('categoryImage',categoryImage);
    addCategory(form);
    // const cat = {
    //     categoryName,
    //     categoryParentId,
    //     categoryImage
    // };
    // console.log(cat);
    handleClose();
  };

  const handleShow = () =>{
      if(categories && categories.length>0) setShow(true);
  };

  useEffect(() => {
    async function getCategories() {
      const res = await axiosInstance.get("/category/get");
      if (res.status == 200) {
        console.log(res.data);
        setCategories(res.data);
       
      } else setCategories([]);
    }
    getCategories();
  }, []);

  const renderCategories = (categorylist) => {
    if (!categorylist || categorylist.length === 0) return;

    return categorylist.map((category) => (
      <li key={category.name}>
        {category.name}
        {category.children.length > 0 && (
          <ul>{renderCategories(category.children)}</ul>
        )}
      </li>
    ));
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


  const handleCategoryImage = (e) =>{
    setCategoryImage(e.target.files[0]);
  };

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
                {categories.length>0 &&
                    createCategoryList(categories).map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.name}</option>
                    ))
                }
            </Form.Select>
            <Form.Control type="file" style={{marginTop:"10px"}} onChange={handleCategoryImage}/>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide animation={true}>
            <Toast.Header>
                <strong className="me-auto">Notification</strong>            
            </Toast.Header>
            <Toast.Body className={'Warning'}><b>Category Created Succesfully</b></Toast.Body>
        </Toast>
        </ToastContainer>
      <div className="cheader">
        <h3>Category</h3>
        <Button variant="success" onClick={() => handleShow()}>
          Add
        </Button>
      </div>
      <div className="ccontent">       
        {categories && <ul>{renderCategories(categories)}</ul>}
      </div>
    </div>
  );
};

export default Category;
