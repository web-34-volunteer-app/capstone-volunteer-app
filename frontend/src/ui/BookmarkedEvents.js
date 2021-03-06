import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {BookMarkedEventsRow} from "./BookMarkedEventsRow";
import {fetchBookedMarkedEventByUserId} from "../store/bookmarkevent";
import {Accordion,Col} from "react-bootstrap";

import './style.css';



export function BookmarkedEvents() {
    const dispatch = useDispatch()
    const bookmarked = useSelector(state => {return state.bookmarked ? state.bookmarked : null})
    const sideEffects = () => {
        dispatch(fetchBookedMarkedEventByUserId())
    }

    React.useEffect(sideEffects, [dispatch])

    return(
        <>
            <div className={"bookMarks text-center py-1"}><h5>Bookmarked Events</h5></div>
            <Col md={12} className="d-block mx-auto mb-4" >
                <Accordion>
                    {bookMarkedRows(bookmarked)}
                </Accordion>
            </Col>
        </>
    )
}
const bookMarkedRows = (bookmarked)=>{
    if (bookmarked){
        return bookmarked.map(event=> <BookMarkedEventsRow key={event.eventId} event={event}/>)

    }
    return null
}