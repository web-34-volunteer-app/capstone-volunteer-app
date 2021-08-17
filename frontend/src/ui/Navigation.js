import React, {useState} from "react";
import {Container, Nav, Navbar, NavDropdown, Offcanvas} from "react-bootstrap";
import HeaderImage from "./images/HeaderLogoImage.svg";
import {RegisterForm} from "./RegisterForm";
import "./style.css"

export function Navigation() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    return (
        <>
            <Navbar id="navbar1" expand="lg">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        src={HeaderImage}
                        width="150"
                        height="45"
                        className="d-inline-block align-top"
                        alt="Mission Citizen Logo"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#" onClick={toggleShow} className="ms-auto">Register</Nav.Link>
                        <Nav.Link href="#" className="ms-auto">Log In</Nav.Link>
                        <Nav.Link href="#" className="ms-auto">Contact</Nav.Link>
                        <Nav.Link href="#" className="ms-auto">Log Out</Nav.Link>
                        <Nav.Link href="#" className="ms-auto">Privacy Settings</Nav.Link>
                        <Nav.Link href="#" className="ms-auto">Community Guidelines</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <Offcanvas show={show} onHide={handleClose} backdrop={false} scroll={false} placement={"end"} >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Register Account</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                   <RegisterForm/>
                </Offcanvas.Body>
            </Offcanvas>
        </>

    )

}

