import React from 'react';
import {Accordion, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchEventByUserId} from "../../store/registeredeventsbyuser";
import {EventListRow} from "../common/EventListRow";
import {EventAttendingRow} from "../deprecated/EventAttendingRow";


export function EventsAttending() {
    const dispatch = useDispatch()
    const registered = useSelector(state => {return state.registered ? state.registered : null})
    const sideEffects = () => {
        dispatch(fetchEventByUserId())
    }

    React.useEffect(sideEffects, [dispatch])

    return(
        <>
            <div className={"eventAttending text-center py-1"}><h5>Registered Events</h5></div>
            <Col md={12} className="d-block mx-auto mb-4" >
                <Accordion>
                    {eventRows(registered)}
                </Accordion>
            </Col>
        </>
    )
}
const eventRows = (registered)=>{
    if (registered){
        return registered.map(event=>
            <EventListRow
                key={event.eventId}
                event={event}
                unregisterButton={true}
            />)
    }
    return null
    }