import {Accordion, Button} from "react-bootstrap";
import React from "react";
import {useDispatch} from "react-redux";
import {httpConfig} from "../utils/httpConfig";
import {fetchEventByUserId} from "../store/registeredeventsbyuser";
import {dateTimeToDate, dateTimeToTime} from "./dateFormat";
import './style.css'

export const EventAttendingRow =({event})=> {
const dispatch =useDispatch()
    const unRegisterEvent = () =>{
        console.log("EventId", event)
    httpConfig.delete(`/apis/volunteer/deleteSelf/${event.eventId}`)
        .then(reply => {
            if(reply.status === 200) {
                console.log(reply)
                dispatch(fetchEventByUserId())

            }
            console.log(reply)
        })


}
    function transportation() {
        if(event.eventDescriptionTransportation) {
            return "Yes"
        }
        else {
            return "No"
        }
    }



    return(
        <Accordion.Item eventKey={event.eventId}>
            <Accordion.Header><h6><strong>{event.eventTitle}</strong> | {event.eventOrganization}</h6> <h6 className={"ms-auto"}><strong>Date:</strong> {dateTimeToDate(event.eventDate)}</h6></Accordion.Header>
            <Accordion.Body>

                <p><strong>Description: </strong>{event.eventDescription}</p>
                <p><strong>Start Time: </strong> {dateTimeToTime(event.eventStartTime)} | <strong>End Time:</strong> {dateTimeToTime(event.eventEndTime)}</p>

                <p><strong>Address:</strong>  {event.eventAddress}  </p>
                <p><strong>Transportation provided?</strong> {transportation()}</p>

                <Button
                    className={"unregisteredButton me-2 mt-3 btn-sm"}
                    id="registerFormSubmit"
                    onClick={unRegisterEvent}
                    variant="warning"
                    type="submit">
                    Unregister

                </Button>

            </Accordion.Body>
        </Accordion.Item>
    )
}
