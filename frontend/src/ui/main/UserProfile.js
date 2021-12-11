
import React from "react";
import {UserOverview} from "../UserOverview";
// import {EventApprovalTable} from "./EventApprovalTable";

import {Col, Container, Row} from "react-bootstrap";
import {Map} from "../Map";
import {BookmarkedEvents} from "../event_sections/BookmarkedEvents";
import {EventList} from "../event_sections/EventList";
import {SearchField} from "../SearchField";
import {EventsAttending} from "../event_sections/EventsAttending";
export function UserProfile () {
    return (
        <>
            <Container>
                <UserOverview/>
                <EventsAttending/>
                {/*<EventList option={'registeredEvents'}/>*/}
                <BookmarkedEvents/>
                {/*<EventApprovalTable/>*/}
                <SearchField/>
                <Row g={3} className="my-4">
                    <Col md={6}>
                        <div className="d-flex justify-content-center">
                            <Map width={"50vw"} height={"40vh"}/>
                        </div>
                    </Col>
                    <EventList option={'allEvents'}/>
                </Row>
            </Container>
        </>
    )
}