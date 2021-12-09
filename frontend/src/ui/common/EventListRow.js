import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {Accordion, Button} from "react-bootstrap";
import {httpConfig} from "../../utils/httpConfig";
import {fetchBookedMarkedEventByUserId} from "../../store/bookmarkevent";
import {fetchEventByUserId} from "../../store/registeredeventsbyuser";
import {dateTimeToDate, dateTimeToTime} from "../dateFormat";


export const EventListRow = (props) => {
    const dispatch = useDispatch();
    const [bookmarkButtonText, setBookmarkButtonText] = useState("Bookmark");

    const registerThisEvent = () => {
        httpConfig.post(`/apis/volunteer/${props.event.eventId}`)
            .then(reply => {
                if(reply.status === 200) {
                    dispatch(fetchEventByUserId())
                }
            })
    }

    const registerBookmarkedEvent = () => {
        registerThisEvent();
        removeAddBookmark();
    }

    const unRegisterEvent = () =>{
        httpConfig.delete(`/apis/volunteer/deleteSelf/${props.event.eventId}`)
            .then(reply => {
                if(reply.status === 200) {
                    dispatch(fetchEventByUserId())
                }
            })
    }

    const removeAddBookmark = () =>{
        httpConfig.post(`/apis/bookmarkedEvent/${props.event.eventId}`)
            .then(reply => {
                if(reply.status === 200) {
                    dispatch(fetchBookedMarkedEventByUserId());
                    setBookmarkButtonText(() => {
                        return (bookmarkButtonText === "Bookmark") ? "Unbookmark" : "Bookmark";
                    })
                }
            })
    }

    const displayButtons = () => {
        let buttons = [];
        if(props.registerButton) {
            buttons.push(
                <Button
                    className={"registerButton me-2 mt-3 btn-sm"}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={registerThisEvent}
                    type="submit">
                    Register
                </Button>
            )
        }
        if(props.registerBookmarkButton) {
            buttons.push(
                <Button
                    className={"registerButton me-2 mt-3 btn-sm"}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={registerBookmarkedEvent}
                    type="submit">
                    Register
                </Button>
            )
        }
        if(props.bookmarkButton) {
            buttons.push(
                <Button
                    className={"registerButton me-2 mt-3 btn-sm"}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={removeAddBookmark}
                    type="submit">
                    {bookmarkButtonText}
                </Button>
            )
        }
        if(props.unbookmarkButton) {
            buttons.push(
                <Button
                    className={"removeButton me-2 mt-3 btn-sm"}
                    id="registerFormSubmit"
                    variant="warning"
                    onClick={removeAddBookmark}
                    type="submit">
                    Remove
                </Button>
            )
        }
        if(props.unregisterButton) {
            buttons.push(
                <Button
                    className={"unregisteredButton me-2 mt-3 btn-sm"}
                    id="registerFormSubmit"
                    onClick={unRegisterEvent}
                    variant="warning"
                    type="submit">
                    Unregister
                </Button>
            )
        }
        return buttons;
    }

    return(
        <Accordion.Item eventKey={props.event.eventId}>
            <Accordion.Header><h6 className={"col-7"}><strong>{props.event.eventTitle}</strong> | {props.event.eventOrganization}</h6> <h6 className={"ms-auto"}><strong>Date:</strong> {dateTimeToDate(props.event.eventDate)}</h6></Accordion.Header>
            <Accordion.Body>

                <p><strong>Description: </strong>{props.event.eventDescription}</p>
                <p><strong>Start Time: </strong> {dateTimeToTime(props.event.eventStartTime)} | <strong>End Time:</strong> {dateTimeToTime(props.event.eventEndTime)}</p>

                <p><strong>Address:</strong>  {props.event.eventAddress}  </p>
                <p><strong>Transportation provided?</strong> {props.event.eventDescriptionTransportation ? "Yes" : "No"}</p>
                {displayButtons()}
            </Accordion.Body>
        </Accordion.Item>
    )
}
