import {Button} from "react-bootstrap";
import React from "react";
import {useDispatch} from "react-redux";
import {httpConfig} from "../utils/httpConfig";
import {fetchEventByUserId} from "../store/registeredeventsbyuser";


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
                    variant="danger"
                    onClick={unRegisterEvent}
                    type="submit">
                    Unregister

                </Button>
            </td>
        </tr>

    )

}