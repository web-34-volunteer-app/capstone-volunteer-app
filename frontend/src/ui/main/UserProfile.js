
import React, {useState} from "react";
import {UserOverview} from "../UserOverview";
// import {EventApprovalTable} from "./EventApprovalTable";

import {Col, Container, Row} from "react-bootstrap";
import {Map} from "../Map";
import {EventList} from "../common/EventList";
import {SearchField} from "../SearchField";

export function UserProfile () {

    const [selectedEventId, setSelectedEventId] = useState(null);
    const [eventIsSelected, setEventIsSelected] = useState(false);

    const selectedEventCallBack = (eventId, selected) => {
        setSelectedEventId(eventId);
        setEventIsSelected(selected);
    }

    return (
        <>
            <Container>
                <UserOverview/>
                <EventList
                    option={'registeredEvents'}
                    header={'Events Attending'}
                    colSize={12}
                    colClass={"mb-4"}
                />
                <EventList
                    option={'bookmarkedEvents'}
                    header={'Bookmarks'}
                    colSize={12}
                    colClass={"mb-4"}
                />
                {/*<EventApprovalTable/>*/}
                <SearchField/>
                <Row g={3} className="my-4">
                    <Col md={6}>
                        <div className="d-flex justify-content-center">
                            <Map
                                selectedEvent={selectedEventId}
                                eventIsSelected={eventIsSelected}
                                selectedEventCallback={selectedEventCallBack}
                                width={"50vw"}
                                height={"40vh"}/>
                        </div>
                    </Col>
                    <EventList
                        option={'allEvents'}
                        header={'Local Events'}
                        selectedEvent={selectedEventId}
                        eventIsSelected={eventIsSelected}
                        selectedEventCallback={selectedEventCallBack}
                        colSize={6}
                        colClass={""}
                    />
                </Row>
            </Container>
        </>
    )
}

