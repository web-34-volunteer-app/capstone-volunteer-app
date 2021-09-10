import React from "react";
import {Accordion, Col} from "react-bootstrap";

export function EventList(props){
    const {events} = props;



    return(
        <>
            <Col md={6} className="d-block mx-auto">
                <Accordion>
                    {events.map(event => <EventItem event={event} key={event.eventId}/>) }
                </Accordion>
            </Col>
        </>
    )
}

function EventItem(props) {
    const {event} = props;

    return (
        <>
            <Accordion.Item eventKey={event.eventId}>
                <Accordion.Header>{event.eventTitle}</Accordion.Header>
                <Accordion.Body>
                    {event.eventAddress}
                    {event.eventDescription}
                </Accordion.Body>
            </Accordion.Item>
        </>
    );
}