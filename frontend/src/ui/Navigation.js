import React, {useEffect, useState} from "react";
import {Container, Nav, Navbar, Offcanvas} from "react-bootstrap";
import HeaderImage from "./images/MC3YellowWhite.svg";
import {RegisterForm} from "./RegisterForm";
import {LoginForm} from "./LoginForm";
import {CreateEventForm} from "./CreateEventForm";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {httpConfig} from "../utils/httpConfig";
import {fetchAuth, getAuth} from "../store/auth";
import './style.css'

let offcanvasTitle = "";
let offcanvasForm = <></>;


export function Navigation() {
    const [show, setShow] = useState(false);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const effects = () => {
        dispatch(fetchAuth());
    }
    useEffect(effects, [dispatch]);
    const handleClose = () => setShow(false);

    const toggleShow = (option) => {
        if (show) {
            handleClose();
            return;
        }
        switch (option) {
            case("register"):
                offcanvasTitle = "Register Account";
                offcanvasForm = <RegisterForm handleClose={handleClose}/>;
                break;
            case("login"):
                offcanvasTitle = "Log In";
                offcanvasForm = <LoginForm handleClose={handleClose}/>;
                break;
            case("register event"):

                offcanvasTitle = "Create Event";
                offcanvasForm = <CreateEventForm handleClose={handleClose}/>;

                break;
            default:
                offcanvasTitle = "";
                offcanvasForm = <></>;
                break;
        }

        setShow((s) => !s);
    }

    const signOut = () => {
        httpConfig.get('/apis/sign-out/').then(reply => {

            if (reply.status === 200) {
                window.localStorage.removeItem('authorization')
                dispatch(getAuth(null))
                window.location = '/'
                alert("Log out successful.");
            }
        })
    }

    const registerLink = <Nav.Link key={"RegisterLink"} href="#" onClick={() => {
        toggleShow("register");
    }}>Register</Nav.Link>;
    const logInLink = <Nav.Link key={"LogInLink"} href="#" onClick={() => {
        toggleShow("login");
    }}>Log In</Nav.Link>;
    const createEventLink = <Nav.Link key={"CreateEventLink"} href="#" onClick={() => {
        toggleShow("register event");
    }}>Create Event</Nav.Link>;
    const logOutLink = <Nav.Link key={"LogOutLink"} href="#" onClick={signOut}>Log Out</Nav.Link>;
    // const contactLink = <Nav.Link href="#">Contact</Nav.Link>;
    // const privacyLink = <Nav.Link href="#">Privacy Settings</Nav.Link>;
    // const communityGuidelinesLink = <Nav.Link href="#">Community Guidelines</Nav.Link>;
    // const userProfileLink = <Nav.Link href="/user-profile">User Profile</Nav.Link>;

    const visitorNavigation = [registerLink, logInLink];
    const userNavigation = [createEventLink, logOutLink];

    let navigationItems;

    if (auth) {
        navigationItems = userNavigation;
    } else {
        navigationItems = visitorNavigation;
    }

    return (
        <>
            <Navbar expand="lg">
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
                            {navigationItems}
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