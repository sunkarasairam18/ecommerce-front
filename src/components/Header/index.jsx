import React from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { signOutUser } from "../../Store/reducer";
import { useSelector,useDispatch } from "react-redux";

const Header = ({ticket:token}) => {
  const dispatch = useDispatch();
  const ticket = useSelector(state => state.user.data.token);
  const name = useSelector(state => state.user.data.userName);

  const logout = () =>{
    dispatch(signOutUser());
  };

  const renderItems = () =>{
    return (
      !ticket?(
        <Nav>
          
          <li className="nav-item">              
            <Link className="nav-link" to="/signin">Signin</Link>
          </li>
          <li className="nav-item">
            <Link  className="nav-link" to="/signup">Signup</Link>
          </li>
        </Nav>
      ):(
        <Nav>
           <li className="nav-item">              
            <div className="nav-link">{name}</div>
          </li>
          <li className="nav-item">              
            <div style={{cursor:"pointer"}} className="nav-link" onClick={logout}>Logout</div>
          </li>         
        </Nav>
      )
    );
  }

  return (
    <div style={{flex:0.07}}>
      
    <Navbar collapseOnSelect  expand="lg" bg="dark" variant="dark">
      <Container >
        <Link className="navbar-brand" to="/" style={{"cursor":"pointer"}}>Admin Dashboard</Link>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {renderItems()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default Header;
