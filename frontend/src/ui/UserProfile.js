import React from "react";
import {UserOverview} from "./UserOverview";
import {EventApprovalTable} from "./EventApprovalTable";
import {CreateEventForm} from "./CreateEventForm";
import {EventDetails} from "./EventDetails";
import {Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {Map} from "./Map";
import {EventList} from "./EventList";
import {SearchField} from "./SearchField";
import {EventsAttending} from "./EventsAttending";

let events = [
    {
        id: 0,
        eventName: 'Save a Pet',
        pointOfContact: 'Andrew',
        eventDescription: 'Blah blah blah'
    },
    {
        id: 1,
        eventName: 'Save a Bird',
        pointOfContact: 'Jericho',
        eventDescription: 'Blah blah blah'
    }
]

let eventDetails = []

events.forEach((event, index) =>{
    eventDetails.push(<EventDetails eventName={event.eventName} pointOfContact={event.pointOfContact} eventDescription={event.eventDescription}/>)

})


export function UserProfile () {
    return (
        <>
            <Container>
            <UserOverview/>
                <EventsAttending/>
            <EventApprovalTable/>
            <SearchField/>
                <Row g={3} className="my-4">
                    <Col md={6}>
                        <div className="d-flex justify-content-center">
                            <Map width={"50vw"} height={"40vh"}/>
                        </div>
                    </Col>
                    <EventList/>
                </Row>
            {/*{eventDetails}*/}
            </Container>
        </>
    )
}