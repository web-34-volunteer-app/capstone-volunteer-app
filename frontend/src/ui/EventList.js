import React from "react";
import {Accordion, Button, Col} from "react-bootstrap";

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
                <Accordion.Header><h6>Event Title: {event.eventTitle} |  Organization:{event.eventOrganization}</h6> </Accordion.Header>
                <Accordion.Body>
                    <h6>Location: {event.eventAddress}  </h6>
                    Description: {event.eventDescription}
                    <br/>
                    <h6>Date: {event.eventDate}</h6>
                    <h6>Start Time: {event.eventStartTime} | End Time: {event.eventEndTime}</h6>
                    <br/>
                    <h6>Transportation provided? {event.eventDescriptionTransportation}</h6>
                    <Button
                        className={"me-2 mt-3"}
                        id="registerFormSubmit"
                        variant="primary"
                        type="submit">
                        Volunteer for Event
                    </Button>
                    <Button
                        className={"me-2 mt-3"}
                        id="registerFormSubmit"
                        variant="primary"
                        type="submit">
                        Bookmark Event
                    </Button>
                </Accordion.Body>
            </Accordion.Item>
        </>
    );
}