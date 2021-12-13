import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Accordion, Button} from "react-bootstrap";
import {VolunteerList} from "./VolunteerList";
import {httpConfig} from "../../utils/httpConfig";
import {fetchBookmarkedEventByUserId} from "../../store/eventsbookmarkedbycurrentuser";
import {fetchRegisteredEventByUserId} from "../../store/eventsregisteredbyuser";
import {dateTimeToDate, dateTimeToTime} from "../dateFormat";
import {fetchUsersForCoordinator} from "../../store/usersForCoordinator";
import {fetchVolunteersForCoordinator} from "../../store/volunteersForCoordinator";


export const EventListRow = (props) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //Set up store for Bookmarked Events
    const bookmarkedEvents = useSelector(state => state.bookmarked ? state.bookmarked : null);

    const initButtonText = () => {
        //Find initial value of buttonText
        let buttonText = "Bookmark";
        if (bookmarkedEvents) {
            bookmarkedEvents.forEach(bookmark => {
                if (bookmark.eventId === props.event.eventId) {
                    buttonText = "Unbookmark";
                    return null;
                }
            })
        }

        return buttonText;
    }

    //Check if event is in bookMarkedEvents, set initialState to "Bookmark" if not bookmarked, else "Unbookmark"
    const [bookmarkButtonText, setBookmarkButtonText] = useState(initButtonText());
    useEffect(() => {
        handleBookmarkToggle();
    })

    //Handle bookmark toggle: Check if event matches any bookmarked events, sets bookmark button accordingly
    const handleBookmarkToggle = () => {
        let valueSet = false;
        if (bookmarkedEvents) {
            bookmarkedEvents.forEach(bookmark => {
                if (bookmark.eventId === props.event.eventId) {
                    setBookmarkButtonText("Unbookmark");
                    valueSet = true;
                    return null;
                }
            })
        }
        if(!valueSet) {
            setBookmarkButtonText("Bookmark");
        }
    }

    const registerThisEvent = () => {
        httpConfig.post(`/apis/volunteer/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchRegisteredEventByUserId());
                    dispatch(fetchUsersForCoordinator());
                    dispatch(fetchVolunteersForCoordinator());
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
                    dispatch(fetchRegisteredEventByUserId());
                    dispatch(fetchUsersForCoordinator());
                    dispatch(fetchVolunteersForCoordinator());
                }
            })
    }

    const removeAddBookmark = () => {
        httpConfig.post(`/apis/bookmarkedEvent/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchBookmarkedEventByUserId())
                        .then(
                            handleBookmarkToggle()
                        );
                }
            })
    }

    const deleteThisEvent = () => {

    }

    const getButton = (option) => {
        switch(option) {
            case "register":
                return (
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
            case "delete":
                return (
                    <Button
                        className={"registerButton me-2 mt-3 btn-sm"}
                        key={"deleteButton" + props.event.eventId}
                        id="registerFormSubmit"
                        variant="primary"
                        onClick={deleteThisEvent}
                        type="submit"
                    >
                        Delete
                    </Button>
                )
            case "bookmarkRegister":
                return (
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
            case "bookmarkToggle":
                return (
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
            case "bookmarkRemove":
                return (
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
            case "unregister":
                return (
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
            default:
                return null;
        }
    }

    const getVolunteerList = () => {
        return (
            <VolunteerList
                key={'volunteerList'+props.event.eventId}
                event={props.event}
            />
        )
    }

    const displayComponents = () => {
        let components = [];
        switch(props.type) {
            case "localEvent":
                components.push(getButton("register"));
                components.push(getButton("bookmarkToggle"));
                return components;
            case "coordinatedEvent":
                components.push(getVolunteerList());
                components.push(getButton("delete"));
                return components;
            case "registeredEvent":
                components.push(getButton("unregister"));
                return components;
            case "bookmarkedEvent":
                components.push(getButton("bookmarkRegister"));
                components.push(getButton("bookmarkRemove"));
                return components;
            default:
                return components;
        }
    }

    const handleEventSelect = () => {

    }

    return (
            <Accordion.Item onClick={handleEventSelect()} eventKey={props.event.eventId}>
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
                    {auth ? displayComponents() : null}
                </Accordion.Body>
            </Accordion.Item>
    )
}
