import React from "react";
import {Accordion, Col} from "react-bootstrap";

export function EventList(){
    return(
        <>
            <Col md={6} className="d-block mx-auto">
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Volunteer Opportunity Event 1</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Volunteer Opportunity Event 2</Accordion.Header>
                        <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            est laborum.
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Col>


        </>
    )
}