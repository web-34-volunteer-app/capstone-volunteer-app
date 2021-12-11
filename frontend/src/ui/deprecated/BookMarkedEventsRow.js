import {Accordion, Button} from "react-bootstrap";
import React from "react";
import {useDispatch} from "react-redux";
import {httpConfig} from "../../utils/httpConfig";
import {fetchBookmarkedEventByUserId} from "../../store/bookmarkevent";
import {fetchEventByUserId} from "../../store/registeredeventsbyuser";
import {dateTimeToDate, dateTimeToTime} from "../dateFormat";
import '../style.css'

export const BookMarkedEventsRow =({event})=> {
    const dispatch =useDispatch()
    const removeBookmark = () =>{
        httpConfig.post(`/apis/bookmarkedEvent/${event.eventId}`)
            .then(reply => {
                if(reply.status === 200) {
                    dispatch(fetchBookmarkedEventByUserId())
                }
            })
    }
    const registerEvent = () =>{
        httpConfig.post(`/apis/volunteer/${event.eventId}`)
            .then(reply => {
                if(reply.status === 200) {
                    dispatch(fetchEventByUserId())
                }
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
                    className={"registerButton me-2 mt-3 btn-sm"}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={registerEvent}
                    type="submit">
                    Register
                </Button>
                <Button
                    className={"removeButton me-2 mt-3 btn-sm"}
                    id="registerFormSubmit"
                    variant="warning"
                    onClick={removeBookmark}
                    type="submit">
                    Remove
                </Button>
            </Accordion.Body>
        </Accordion.Item>
    )
}



