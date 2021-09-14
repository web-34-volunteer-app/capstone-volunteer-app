import {Button} from "react-bootstrap";
import React from "react";
import {useDispatch} from "react-redux";
import {httpConfig} from "../utils/httpConfig";
import {fetchBookedMarkedEventByUserId} from "../store/bookmarkevent";
import {fetchEventByUserId} from "../store/registeredeventsbyuser";


export const BookMarkedEventsRow =({event})=> {
    const dispatch =useDispatch()
    const removeBookmark = () =>{
        console.log("EventId", event)
        console.log("Did it make it here?")
        httpConfig.post(`/apis/bookmarkedEvent/${event.eventId}`)
            .then(reply => {
                if(reply.status === 200) {
                    console.log(reply)
                    dispatch(fetchBookedMarkedEventByUserId())

                }
                console.log(reply)
            })


    }
    const registerEvent = () =>{
        console.log("EventId", event)
        console.log("Did it make it here?")
        httpConfig.post(`/apis/volunteer/${event.eventId}`)
            .then(reply => {
                if(reply.status === 200) {
                    console.log(reply)
                    dispatch(fetchEventByUserId())

                }
                console.log(reply)
            })


    }


    return (
        <tr>

            <td>{event.eventTitle}</td>
            <td>{event.eventOrganization}</td>
            <td>{event.eventDescription}</td>
            <td>{event.eventAddress}</td>
            <td>{event.eventDate}</td>
            <td>{event.eventStartTime} </td>
            <td>{event.eventEndTime}</td>
            <td>
                <Button
                    className={"me-2 mt-3"}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={registerEvent}
                    type="submit">
                    Register

                </Button>
                <Button
                    className={"me-2 mt-3"}
                    id="registerFormSubmit"
                    variant="danger"
                    onClick={removeBookmark}
                    type="submit">
                    Remove

                </Button>
            </td>
        </tr>

    )

}