import {Button} from "react-bootstrap";
import React from "react";
import {useDispatch} from "react-redux";
import {httpConfig} from "../utils/httpConfig";
import {fetchBookedMarkedEventByUserId} from "../store/bookmarkevent";
import {fetchEventByUserId} from "../store/registeredeventsbyuser";
import {dateTimeToDate, dateTimeToTime} from "./dateFormat";


export const BookMarkedEventsRow =({event})=> {
    const dispatch =useDispatch()
    const removeBookmark = () =>{
        httpConfig.post(`/apis/bookmarkedEvent/${event.eventId}`)
            .then(reply => {
                if(reply.status === 200) {
                    dispatch(fetchBookedMarkedEventByUserId())
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
    return (
        <tr>

            <td>{event.eventTitle}</td>
            <td>{event.eventOrganization}</td>
            <td>{event.eventDescription}</td>
            <td>{event.eventAddress}</td>
            <td>{dateTimeToDate(event.eventDate)}</td>
            <td>{dateTimeToTime(event.eventStartTime)} </td>
            <td>{dateTimeToTime(event.eventEndTime)}</td>
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