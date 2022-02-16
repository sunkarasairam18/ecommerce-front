import React,{useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Modal,Container,Row,Col } from 'react-bootstrap';
import '../../css/ProductsTable.css';
import ProductPics from './ProductPics';

const columns = [
    {id: 'serial',label:"S.No",minWidth: 50},
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'price', label: 'Price(₹)', minWidth: 120,
    format: (value) => value.toLocaleString('en-US') },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 50,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'category',
    label: 'Category',
    minWidth: 100,
    align: 'left',
    format: (value) => value.toFixed(2),
  },
];

export default function ProductsTable({rows}) {
    
    const [show,setShow] = useState(false);
    const [product,setProduct] = useState();


    return (
        <Paper sx={{ width: '100%',height:"678px",overflow: "scroll" }} square>
            <Modal show={show} onHide={()=>setShow(false)} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Product Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {product && <Container>
                    <Row>
                        <Col md={9}>
                            <div className="pmodaltitle">
                                Name
                            </div>
                            <div className='pmodaltext'>
                                {product.name}
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="pmodaltitle">
                                Price
                            </div>
                            <div className='pmodaltext'>
                                {product.price?product.price.toLocaleString('en-US')+" ₹":""}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={9}>
                            <div className="pmodaltitle" >
                                Quantity
                            </div>
                            <div className='pmodaltext'>
                                {product.quantity}
                            </div>
                        </Col>
                        <Col md={3}>
                            <div className="pmodaltitle">
                                Category
                            </div>
                            <div className='pmodaltext'>
                                {product.category.name}
                            </div>
                        </Col>
                       
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="pmodaltitle">
                                Description
                            </div>
                            <div className='pmodaltext'>
                                {product.description}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <div className="pmodaltitle">
                                Product Pictures
                            </div>
                            <div className='pmodaltext'>
                                {<ProductPics list={product.productPictures}/>}
                            </div>
                        </Col>
                    </Row>
                    </Container>}
                </Modal.Body>
                
            </Modal>
        <TableContainer  sx={{ height:"678px" }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth,fontWeight: "bold" }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows              
                .map((row) => {
                    return (
                    <TableRow hover role="checkbox" tabIndex={-1} style={{cursor:"pointer"}} onClick={()=>{
                        setShow(true);
                        setProduct(row);
                    }} key={row.price}>
                        {columns.map((column) => {
                        const value = column.id==="category"?row[column.id]["name"]:row[column.id];
                        return (
                            <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                                ? column.format(value)
                                : value}
                            </TableCell>
                        );
                        })}
                    </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        </TableContainer>
        
        </Paper>
    );
}
