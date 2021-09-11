
import React from "react";
import {UserOverview} from "./UserOverview";
import {EventApprovalTable} from "./EventApprovalTable";
import {CreateEventForm} from "./CreateEventForm";

import {Col, Container, FormControl, InputGroup, Row} from "react-bootstrap";
import {Map} from "./Map";
import {EventList} from "./EventList";
import {SearchField} from "./SearchField";
import {EventsAttending} from "./EventsAttending";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllEvents} from "../store/event";




export function UserProfile () {
    const dispatch = useDispatch();
    const initialEffect = () => {
        dispatch(fetchAllEvents());
    }
    React.useEffect(initialEffect, [dispatch])
    const events = useSelector(state => state.events ? state.events : []);
    console.log(events);


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
                    <EventList events={events}/>
                </Row>
            </Container>
        </>
    )
}