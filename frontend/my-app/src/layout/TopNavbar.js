import React from "react";
import "../style/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function TopNavbar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="ml-auto navItem">
              <NavLink to="/" active>
                Home
              </NavLink>
              <NavLink to="/addproduct">Add Product</NavLink>
              <NavLink to="/product">Product List</NavLink>
              <NavLink to="/signup">SignUp</NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/logout">Logout</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
export default TopNavbar;
