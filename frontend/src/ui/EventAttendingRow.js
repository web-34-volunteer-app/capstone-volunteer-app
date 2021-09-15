import {Button} from "react-bootstrap";
import React from "react";
import {useDispatch} from "react-redux";
import {httpConfig} from "../utils/httpConfig";
import {fetchEventByUserId} from "../store/registeredeventsbyuser";
import {dateTimeToDate, dateTimeToTime} from "./dateFormat";


export const EventAttendingRow =({event})=> {
const dispatch =useDispatch()
    const unRegisterEvent = () =>{
    httpConfig.delete(`/apis/volunteer/deleteSelf/${event.eventId}`)
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
                    variant="danger"
                    onClick={unRegisterEvent}
                    type="submit">
                    Unregister

                </Button>
            </td>
        </tr>

    )

}