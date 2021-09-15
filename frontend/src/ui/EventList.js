import React from "react";
import {Accordion, Button, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {httpConfig} from "../utils/httpConfig";
import {fetchBookedMarkedEventByUserId} from "../store/bookmarkevent";
import {fetchAllEvents} from "../store/event";
import {EventListInfo} from "./EventListInfo";

export function EventList(){
    const dispatch = useDispatch();
    const initialEffect = () => {
        dispatch(fetchAllEvents());
    }
    React.useEffect(initialEffect, [dispatch])
    const events = useSelector(state => state.events ? state.events : []);
    console.log(events);



    return(
        <>

            <Col md={6} className="d-block mx-auto"><div className={"eventAttending text-center py-1"}><h5>Nearby Opportunities</h5></div>
                <Accordion>
                    {events.map(event => <EventListInfo event={event} key={event.eventId}/>) }
                </Accordion>
            </Col>
        </>
    )
}

