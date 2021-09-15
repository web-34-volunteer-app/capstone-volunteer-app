import React from 'react';
import {Accordion, Button, Col, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchEventByUserId} from "../store/registeredeventsbyuser";
import {EventAttendingRow} from "./EventAttendingRow";


export function EventsAttending() {
    const dispatch = useDispatch()
    const registered = useSelector(state => {return state.registered ? state.registered : null})
    console.log(registered)
    const sideEffects = () => {
        dispatch(fetchEventByUserId())
    }

    React.useEffect(sideEffects, [dispatch])
console.log(registered)

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
        return registered.map(event=> <EventAttendingRow event={event}/>)

    }
    return null
    }