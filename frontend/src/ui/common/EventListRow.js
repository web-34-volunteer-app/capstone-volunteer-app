import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Accordion, Button} from "react-bootstrap";
import {httpConfig} from "../../utils/httpConfig";
import {fetchBookmarkedEventByUserId} from "../../store/bookmarkevent";
import {fetchEventByUserId} from "../../store/registeredeventsbyuser";
import {dateTimeToDate, dateTimeToTime} from "../dateFormat";


export const EventListRow = (props) => {
    const dispatch = useDispatch();

    //Set up store for Bookmarked Events
    const bookmarkedEvents = useSelector(state => state.bookmarked ? state.bookmarked : null);

    //Check if event is in bookMarkedEvents, set initialState to "Bookmark" if not bookmarked, else "Unbookmark"
    const [bookmarkButtonText, setBookmarkButtonText] = useState(() => {
        let buttonText = "Bookmark";
        if (bookmarkedEvents) {
            console.log("Init bookmarkedEvents: " + JSON.stringify(bookmarkedEvents));
            console.log("Init eventId: " + props.event.eventId);
            bookmarkedEvents.forEach(bookmark => {
                if (bookmark.eventId === props.event.eventId) {
                    buttonText = "Unbookmark";
                    return null;
                }
            })
        }

        console.log("Init Setting button text to: " + buttonText);
        return buttonText;
    });

    const registerThisEvent = () => {
        httpConfig.post(`/apis/volunteer/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchEventByUserId())
                }
            })
    }

    const registerBookmarkedEvent = () => {
        registerThisEvent();
        removeAddBookmark();
    }

    const unRegisterEvent = () => {
        httpConfig.delete(`/apis/volunteer/deleteSelf/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchEventByUserId())
                }
            })
    }

    const removeAddBookmark = () => {
        httpConfig.post(`/apis/bookmarkedEvent/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchBookmarkedEventByUserId())
                        .then(
                            setBookmarkButtonText(() => {
                                let buttonText = "Bookmark";
                                if (bookmarkedEvents) {
                                    console.log("onClick bookmarkedEvents: " + JSON.stringify(bookmarkedEvents));
                                    console.log("onClick eventId: " + props.event.eventId);
                                    bookmarkedEvents.forEach(bookmark => {
                                        if (bookmark.eventId === props.event.eventId) {
                                            buttonText = "Unbookmark";
                                            return null;
                                        }
                                    })
                                }

                                console.log("onClick Setting button text to: " + buttonText);
                                return buttonText;
                            })
                        );

                }
            })
    }

    const displayButtons = () => {
        let buttons = [];
        if (props.registerButton) {
            buttons.push(
                <Button
                    className={"registerButton me-2 mt-3 btn-sm"}
                    key={"registerButton" + props.event.eventId}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={registerThisEvent}
                    type="submit"
                >
                    Register
                </Button>
            )
        }
        if (props.registerBookmarkButton) {
            buttons.push(
                <Button
                    className={"registerButton me-2 mt-3 btn-sm"}
                    key={"registerBookmarkButton" + props.event.eventId}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={registerBookmarkedEvent}
                    type="submit"
                >
                    Register
                </Button>
            )
        }
        if (props.bookmarkButton) {
            buttons.push(
                <Button
                    className={"registerButton me-2 mt-3 btn-sm"}
                    key={"bookmarkButton" + props.event.eventId}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={removeAddBookmark}
                    type="submit"
                >
                    {bookmarkButtonText}
                </Button>
            )
        }
        if (props.unbookmarkButton) {
            buttons.push(
                <Button
                    className={"removeButton me-2 mt-3 btn-sm"}
                    key={"unbookmarkButton" + props.event.eventId}
                    id="registerFormSubmit"
                    variant="warning"
                    onClick={removeAddBookmark}
                    type="submit"
                >
                    Remove
                </Button>
            )
        }
        if (props.unregisterButton) {
            buttons.push(
                <Button
                    className={"unregisteredButton me-2 mt-3 btn-sm"}
                    key={"unregisterButton" + props.event.eventId}
                    id="registerFormSubmit"
                    onClick={unRegisterEvent}
                    variant="warning"
                    type="submit"
                >
                    Unregister
                </Button>
            )
        }
        return buttons;
    }

    return (
        <Accordion.Item eventKey={props.event.eventId}>
            <Accordion.Header><h6 className={"col-7"}>
                <strong>{props.event.eventTitle}</strong> | {props.event.eventOrganization}</h6> <h6
                className={"ms-auto"}><strong>Date:</strong> {dateTimeToDate(props.event.eventDate)}</h6>
            </Accordion.Header>
            <Accordion.Body>

                <p><strong>Description: </strong>{props.event.eventDescription}</p>
                <p><strong>Start Time: </strong> {dateTimeToTime(props.event.eventStartTime)} | <strong>End
                    Time:</strong> {dateTimeToTime(props.event.eventEndTime)}</p>

                <p><strong>Address:</strong> {props.event.eventAddress} </p>
                <p><strong>Transportation provided?</strong> {props.event.eventDescriptionTransportation ? "Yes" : "No"}
                </p>
                {displayButtons()}
            </Accordion.Body>
        </Accordion.Item>
    )
}
