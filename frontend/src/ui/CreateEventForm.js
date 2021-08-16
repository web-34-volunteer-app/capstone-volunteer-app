import React from "react";
import {Col, Row} from "react-bootstrap";
import {Form} from "react-bootstrap";
import {Button} from "react-bootstrap";

export function CreateEventForm() {
    return(
        <>
            <Form>
                <Row className={"p-2"}>
                    <Form.Label column="lg" className="bg-dark text-white">
                        Event Information
                    </Form.Label>
                </Row>
                <Row className={"mt-3"}>
                    <Col>
                        <Form.Control size="text" type="text" placeholder="Event Name"/>
                    </Col>
                    <Col>
                        <Form.Control size="text" type="text" placeholder="Organization"/>
                    </Col>
                </Row>
                <Row className={"mt-3"}>
                    <Col>
                        <Form.Control type="date"/>
                    </Col>
                    <Col>
                        <Form.Control type="time"/>
                    </Col>
                </Row>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label/>
                    <Form.Control as="textarea" placeholder="Event Description" rows={3}/>
                </Form.Group>
                <Button variant="outline-success" className={"align-content-center"}>Create</Button>
            </Form>
        </>
    )

}