import React from "react";
import {Accordion, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllEvents} from "../../store/event";
import {EventListRow} from "../common/EventListRow";

export function EventList(){
    const dispatch = useDispatch();
    const initialEffect = () => {
        dispatch(fetchAllEvents());
    }
    React.useEffect(initialEffect, [dispatch])
    const events = useSelector(state => state.events ? state.events : []);

    return(
        <>
            <Col md={6} className="d-block mx-auto"><div className={"eventAttending text-center py-1"}><h5>Nearby Opportunities</h5></div>
                <Accordion>
                    {events.map(event =>
                        <EventListRow
                            event={event}
                            key={event.eventId}
                            registerButton={true}
                            bookmarkButton={true}
                        />)}
                </Accordion>
            </Col>
        </>
    )
}

