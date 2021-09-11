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
                <Accordion.Header><h6>{event.eventOrganization}: {event.eventTitle}</h6> </Accordion.Header>
                <Accordion.Body>
                    <h6>Location: {event.eventAddress}  </h6>
                    {event.eventDescription}
                    <h6>Transportation provided? {event.eventDescriptionTransportation}</h6>
                </Accordion.Body>
            </Accordion.Item>
        </>
    );
}