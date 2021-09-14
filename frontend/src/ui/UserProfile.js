
import React from "react";
import {UserOverview} from "./UserOverview";
import {EventApprovalTable} from "./EventApprovalTable";
import {CreateEventForm} from "./CreateEventForm";

import {Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {Map} from "./Map";
import {BookmarkedEvents} from "./BookmarkedEvents";
import {EventList} from "./EventList";
import {SearchField} from "./SearchField";
import {EventsAttending} from "./EventsAttending";
export function UserProfile () {
    return (
        <>
            <Container>
                <UserOverview/>
                <EventsAttending/>
                <BookmarkedEvents/>
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
            </Container>
        </>
    )
}