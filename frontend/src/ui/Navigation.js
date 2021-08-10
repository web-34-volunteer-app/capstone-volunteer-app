import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import HeaderImage from "./images/HeaderLogoImage.svg";

export function Navigation() {

    return (
        <Navbar bg="dark" variant="dark">
            <Container className="ms-auto">
                <Navbar.Brand href="#home">
                    <img
                        src={HeaderImage}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                    <Nav>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Navbar.Brand>
            </Container>
        </Navbar>
    )

}

        /*<Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={HeaderImage}
                        width="100"
                        height="100"
                        className="d-inline-block align-top"
                    />
                    React Bootstrap
                </Navbar.Brand>
            </Container>
        </Navbar>*/