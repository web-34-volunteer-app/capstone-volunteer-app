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
                        <Form.Label>Event Name</Form.Label>
                        <Form.Control size="text" type="text" placeholder="Event Name"/>
                    </Col>
                    <Col>
                        <Form.Label>Organization</Form.Label>
                        <Form.Control size="text" type="text" placeholder="Organization"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date"/>
                    </Col>
                </Row>
                <Row className={"mt-3"}>
                    <Col>
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control type="time"/>
                    </Col>
                    <Col>
                        <Form.Label>End Time</Form.Label>
                        <Form.Control type="time"/>
                    </Col>
                </Row>
                <Row className={"mt-3"}>
                    <Form.Group>
                        <Form.Label className={"me-2"}>Transportation Provided?</Form.Label>
                        <Form.Check className="form-check-inline" type="radio" label="Yes" name="transportation"/>
                        <Form.Check className="form-check-inline" type="radio" label="No" name="transportation"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className={"me-2"}>Experience Required?</Form.Label>
                        <Form.Check className="form-check-inline" type="radio" label="Yes" name="experience"/>
                        <Form.Check className="form-check-inline" type="radio" label="No" name="experience"/>
                    </Form.Group>
                </Row>


<Row className={"mt-3"}>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Event Details</Form.Label>
                    <Form.Control as="textarea" placeholder="Event Details" rows={3}/>
                </Form.Group>
</Row>
                <Button variant="outline-success" className={"align-content-center"}>Create</Button>
            </Form>
        </>
    )

}