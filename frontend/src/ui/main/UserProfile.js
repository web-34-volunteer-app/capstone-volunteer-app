
import React from "react";
import {UserOverview} from "../UserOverview";
// import {EventApprovalTable} from "./EventApprovalTable";

import {Col, Container, Row} from "react-bootstrap";
import {Map} from "../Map";
import {EventList} from "../common/EventList";
import {SearchField} from "../SearchField";
export function UserProfile () {
    return (
        <>
            <Container>
                <UserOverview/>
                <EventList
                    option={'registeredEvents'}
                    colSize={12}
                    colClass={"mb-4"}
                />
                <EventList
                    option={'bookmarkedEvents'}
                    colSize={12}
                    colClass={"mb-4"}
                />
                {/*<EventApprovalTable/>*/}
                <SearchField/>
                <Row g={3} className="my-4">
                    <Col md={6}>
                        <div className="d-flex justify-content-center">
                            <Map width={"50vw"} height={"40vh"}/>
                        </div>
                    </Col>
                    <EventList
                        option={'allEvents'}
                        colSize={6}
                        colClass={""}
                    />
                </Row>
            </Container>
        </>
    )
}