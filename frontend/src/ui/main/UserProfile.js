
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
                    option={'coordinatedEvents'}
                    header={"Events I'm Coordinating"}
                    colSide={12}
                    colClass={"mb-4"}
                />
                <EventList
                    option={'registeredEvents'}
                    header={"Events I'm Attending"}
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
                            <Map width={"50vw"} height={"40vh"}/>
                        </div>
                    </Col>
                    <EventList
                        option={'allEvents'}
                        header={'Local Events'}
                        colSize={6}
                        colClass={""}
                    />
                </Row>
            </Container>
        </>
    )
}