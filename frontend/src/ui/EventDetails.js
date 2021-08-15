import React from "react";
import {Button, Card} from "react-bootstrap";

export function EventDetails() {
    return(
        <>
            <Card
                bg={"light"}
                text={"dark"}
                style={{ width: "auto"}}
                className="m-3">
                <Card.Body>
                    <Card.Title>Event Name</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Point of Contact</Card.Subtitle>
                    <Card.Text>
                        (Event Description) Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </Card.Text>
                    <Button variant="outline-success">Register</Button>
                    <Button variant="outline-danger">Report</Button>
                </Card.Body>
            </Card>
        </>
    )

}