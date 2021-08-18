import React, {useState} from "react";
import {Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import HeaderImage from "./images/HeaderLogoImage.svg";
import {RegisterForm} from "./RegisterForm";

export function Navigation() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    return (
        <>
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
                        <Nav.Link href="#" onClick={toggleShow}>Register</Nav.Link>
                        <Nav.Link href="#">Log In</Nav.Link>
                        <Nav.Link href="#">Contact</Nav.Link>
                        <Nav.Link href="#">Log Out</Nav.Link>
                        <Nav.Link href="#">Privacy Settings</Nav.Link>
                        <Nav.Link href="#">Community Guidelines</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
            <Offcanvas show={show} onHide={handleClose} backdrop={false} scroll={false} placement={'end'}>
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

