import React from 'react';
import {Col, Container, Image, Row} from "react-bootstrap";

export function UserOverview () {
    return (
        <>
        <Container className={"py-4"}>
            <div className={"d-flex justify-content-center"}>
                <Col fill md={2} sm={6} className={"justify-content-center me-3"}>
                    <Image src="https://picsum.photos/200/200" alt="Profile Image Placeholder" fluid roundedCircle></Image>
                </Col>

                <Col md={4} sm={6} className={"my-auto"}>
                    <h1>User Name</h1>
                    <h5>Location</h5>
                    <h5>Logged Hours</h5>
                </Col>

            </div>
        </Container>
        </>
    )
}
