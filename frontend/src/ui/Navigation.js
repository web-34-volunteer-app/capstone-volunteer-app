import React, {useState} from "react";
import {Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import HeaderImage from "./images/MC3NAV.svg";
import {RegisterForm} from "./RegisterForm";
import {LoginForm} from "./LoginForm";
import {CreateEventForm} from "./CreateEventForm";
import {Link} from "react-router-dom";




let offcanvasTitle = "";
let offcanvasForm = <></>;

export function Navigation() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const toggleShow = (option) => {
        if(show) {
            handleClose();
            return;
        }
        switch(option) {
            case("register"):
                offcanvasTitle = "Register Account";
                offcanvasForm = <RegisterForm/>;
                break;
            case("login"):
                offcanvasTitle = "Log In";
                offcanvasForm = <LoginForm/>;
                break;
            case("register event"):
                offcanvasTitle = "Register Event";
                offcanvasForm = <CreateEventForm/>;
                break;
            default:
                offcanvasTitle = "";
                offcanvasForm = <></>;
                break;
        }

        setShow((s) => !s);
    }

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><Link to={"/"}>
                        <img
                            src={HeaderImage}
                            width="200"
                            height="auto"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        /></Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">



                        <Nav className="ms-auto">

                            <Nav.Link href="#" onClick={() => {toggleShow("register");}}>Register</Nav.Link>
                            <Nav.Link href="#" onClick={() => {toggleShow("login");}}>Log In</Nav.Link>

                            <Nav.Link href="#" onClick={() => {toggleShow("register event");}}>Register Event</Nav.Link>
                            <Nav.Link href="#">Contact</Nav.Link>
                            <Nav.Link href="#">Log Out</Nav.Link>
                            <Nav.Link href="#">Privacy Settings</Nav.Link>
                            <Nav.Link href="#">Community Guidelines</Nav.Link>
                            <Nav.Link href= "/user-profile">User Profile</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Offcanvas show={show} onHide={handleClose} backdrop={false} scroll={false} placement={'end'}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{offcanvasTitle}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                        {offcanvasForm}
                </Offcanvas.Body>
            </Offcanvas>
        </>

    )

}