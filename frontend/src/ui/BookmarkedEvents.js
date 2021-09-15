import React from 'react';
import {Accordion, Button, Col, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {BookMarkedEventsRow} from "./BookMarkedEventsRow";
import bookmarked, {fetchBookedMarkedEventByUserId} from "../store/bookmarkevent";
import './style.css';


export function BookmarkedEvents() {
    const dispatch = useDispatch()
    const bookmarked = useSelector(state => {return state.bookmarked ? state.bookmarked : null})
    console.log(bookmarked)
    const sideEffects = () => {
        dispatch(fetchBookedMarkedEventByUserId())
    }

    React.useEffect(sideEffects, [dispatch])
    console.log(bookmarked)

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
        return bookmarked.map(event=> <BookMarkedEventsRow event={event}/>)

    }
    return null
}