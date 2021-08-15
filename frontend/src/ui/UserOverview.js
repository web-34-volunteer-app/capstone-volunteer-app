import React from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";

export function UserOverview () {
    return (
        <>
        <Container className={"py-4"}>
            <Row className={"justify-content-center row"}>
                <Col className={"col-4"}>
                    <Image src="https://picsum.photos/100/100" alt="Profile Image Placeholder" fluid roundedCircle></Image>
                </Col>
                <Col className={"col-6"}>
                    <h1>User Name</h1>
                    <h5>Location</h5>
                    <h5>Logged Hours</h5>
                </Col>
            </Row>
        </Container>
        </>
    )
}
