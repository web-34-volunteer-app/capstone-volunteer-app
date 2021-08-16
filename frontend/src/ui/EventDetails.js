import React from "react";
import {Button, Card} from "react-bootstrap";

export function EventDetails(props) {
    return(
        <>
            <Card
                bg={"light"}
                text={"dark"}
                style={{ width: "auto"}}
                className="m-3">
                <Card.Body>
                    <Card.Title>{props.eventName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.eventName}</Card.Subtitle>
                    <Card.Text>{props.eventDescription}</Card.Text>
                    <Button variant="outline-success">Register</Button>
                    <Button variant="outline-danger">Report</Button>
                </Card.Body>
            </Card>
        </>
    )

}