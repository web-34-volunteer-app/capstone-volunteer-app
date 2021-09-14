import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllEvents} from "../store/event";
import {Accordion, Button} from "react-bootstrap";
import {httpConfig} from "../utils/httpConfig";
import {fetchBookedMarkedEventByUserId} from "../store/bookmarkevent";
import {fetchEventByUserId} from "../store/registeredeventsbyuser";


export const EventListInfo =({event})=>{
    const dispatch =useDispatch()
    const removeAddBookmark = () =>{
        httpConfig.post(`/apis/bookmarkedEvent/${event.eventId}`)
            .then(reply => {
                if(reply.status === 200) {
                    console.log(reply)
                    dispatch(fetchBookedMarkedEventByUserId())
                }
                console.log(reply)
            })
    }
    const registerThisEvent = () =>{
        httpConfig.post(`/apis/volunteer/${event.eventId}`)
            .then(reply => {
                if(reply.status === 200) {
                    console.log(reply)
                    dispatch(fetchEventByUserId())
                }
                console.log(reply)
            })
    }

    return(
        <Accordion.Item eventKey={event.eventId}>
            <Accordion.Header><h6>Event Title: {event.eventTitle} |  Organization:{event.eventOrganization}</h6> </Accordion.Header>
        <Accordion.Body>

            Description: {event.eventDescription}
            <br/>
            <h6>Date: {event.eventDate}</h6>
            <h6>Start Time: {event.eventStartTime} | End Time: {event.eventEndTime}</h6>
            <br/>
            <h6>Location: {event.eventAddress}  </h6>
            <h6>Transportation provided? {event.eventDescriptionTransportation}</h6>

            <Button
                className={"me-2 mt-3"}
                id="registerFormSubmit"
                variant="primary"
                onClick={registerThisEvent}
                type="submit">
                Volunteer for Event
            </Button>
            <Button
                className={"me-2 mt-3"}
                id="registerFormSubmit"
                variant="primary"
                onClick={removeAddBookmark}
                type="submit">
                Bookmark Event
            </Button>
        </Accordion.Body>
        </Accordion.Item>




    )
}