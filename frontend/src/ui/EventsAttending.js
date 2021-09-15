import React from 'react';
import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchEventByUserId} from "../store/registeredeventsbyuser";
import {EventAttendingRow} from "./EventAttendingRow";


export function EventsAttending() {
    const dispatch = useDispatch()
    const registered = useSelector(state => {return state.registered ? state.registered : null})
    const sideEffects = () => {
        dispatch(fetchEventByUserId())
    }

    React.useEffect(sideEffects, [dispatch])

    return(
        <>
            <div className={"border border-2 text-center py-1"}><h5>Registered Events</h5></div>
            <Table responsive="sm" striped bordered hover>
                <thead>

                <tr>
                    <th>Event Title</th>
                    <th>Organization</th>
                    <th>Event Description</th>
                    <th>Event Address</th>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Take Action</th>
                </tr>
                </thead>
                <tbody>
                {eventRows(registered)}

                </tbody>
            </Table>
        </>
    )

}
const eventRows = (registered)=>{
    if (registered){
        return registered.map(event=> <EventAttendingRow key={event.eventId} event={event}/>)

    }
    return null
    }