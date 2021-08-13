import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import HeaderImage from "./images/HeaderLogoImage.svg";

export function Navigation() {

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={HeaderImage}
                        width="100"
                        height="25"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#">Register</Nav.Link>
                        <Nav.Link href="#">Log In</Nav.Link>
                        <Nav.Link href="#">Contact</Nav.Link>
                        <Nav.Link href="#">Log Out</Nav.Link>
                        <Nav.Link href="#">Privacy Settings</Nav.Link>
                        <Nav.Link href="#">Community Guidelines</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

