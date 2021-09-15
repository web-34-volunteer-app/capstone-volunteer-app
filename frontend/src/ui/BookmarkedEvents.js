import React from 'react';
import {Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {BookMarkedEventsRow} from "./BookMarkedEventsRow";
import {fetchBookedMarkedEventByUserId} from "../store/bookmarkevent";


export function BookmarkedEvents() {
    const dispatch = useDispatch()
    const bookmarked = useSelector(state => {return state.bookmarked ? state.bookmarked : null})
    const sideEffects = () => {
        dispatch(fetchBookedMarkedEventByUserId())
    }

    React.useEffect(sideEffects, [dispatch])

    return(
        <>
            <div className={"border border-2 text-center py-1"}><h5>Bookmarked Events</h5></div>
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
                {eventRows(bookmarked)}

                </tbody>
            </Table>
        </>
    )

}
const eventRows = (bookmarked)=>{
    if (bookmarked){
        return bookmarked.map(event=> <BookMarkedEventsRow key={event.eventId} event={event}/>)

    }
    return null
}