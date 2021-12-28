import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {EventListContext, StoreContext} from "../main/Home";
import {httpConfig} from "../../utils/httpConfig";
import {fetchUsersForCoordinator} from "../../store/usersForCoordinator";
import {fetchVolunteersForCoordinator} from "../../store/volunteersForCoordinator";
import {fetchRegisteredEventByUserId} from "../../store/eventsregisteredbyuser";
import {fetchBookmarkedEventByUserId} from "../../store/eventsbookmarkedbycurrentuser";
import {fetchAllEvents} from "../../store/event";
import {fetchCoordinatedEventByUserId} from "../../store/eventscoordinatedbycurrentuser";
import {Button} from "react-bootstrap";
import {EventContext} from "./EventList";
import {EventStatusContext} from "./EventListRow";
import {dateTimeToDate} from "../dateFormat";

export const EventButton = (props) => {
    const {
        dispatch,
        currentUser,
        coordinatedEvents,
        registeredEvents,
        bookmarkedEvents
    } = useContext(StoreContext);

    const {event} = useContext(EventContext);
    const {eventType} = useContext(EventListContext);
    const {
        eventStatus,
        setEventStatus,
        setHeader
    } = useContext(EventStatusContext);

    //START FETCH FUNCTIONS
    const registerThisEvent = useCallback(() => {
        if (event) {
            httpConfig.post(`/apis/volunteer/${event.eventId}`)
                .then(reply => {
                    if (reply.status === 200) {
                        dispatch(fetchUsersForCoordinator());
                        dispatch(fetchVolunteersForCoordinator());
                        dispatch(fetchRegisteredEventByUserId());
                    }
                });
        }
    }, [dispatch, event]);

    const removeAddBookmark = useCallback(() => {
        if (event) {
            httpConfig.post(`/apis/bookmarkedEvent/${event.eventId}`)
                .then(reply => {
                    if (reply.status === 200) {
                        dispatch(fetchBookmarkedEventByUserId());
                    }
                })
        }
    }, [dispatch, event]);

    const unRegisterEvent = useCallback(() => {
        if (event) {
            httpConfig.delete(`/apis/volunteer/deleteSelf/${event.eventId}`)
                .then(reply => {
                    if (reply.status === 200) {
                        dispatch(fetchRegisteredEventByUserId());
                        dispatch(fetchUsersForCoordinator());
                        dispatch(fetchVolunteersForCoordinator());
                    }
                });
        }
    }, [dispatch, event]);

    const deleteThisEvent = useCallback(() => {
        if (event) {
            httpConfig.delete(`/apis/event/eventId/${event.eventId}`)
                .then(reply => {
                    if (reply.status === 200) {
                        dispatch(fetchAllEvents());
                        dispatch(fetchCoordinatedEventByUserId());
                        alert("Event Deleted");
                    }
                })
        }
    }, [dispatch, event]);
    //END FETCH FUNCTIONS

    //START UTILITY FUNCTIONS
    const isBookmarked = useMemo(() => {
        let bookmarked = false;
        if (bookmarkedEvents) {
            bookmarkedEvents.every(bookmark => {
                if (bookmark.eventId === event.eventId) {
                    bookmarked = true;
                    return false;
                }
                return true;
            })
        }
        return bookmarked;
    }, [bookmarkedEvents,
        event.eventId]);

    const isRegistered = useMemo(() => {
        let registered = false;
        if (registeredEvents) {
            registeredEvents.every(registeredEvent => {
                if (registeredEvent.eventId === event.eventId) {
                    registered = true;
                    return false;
                }
                return true;
            });
        }
        return registered;
    }, [registeredEvents,
        event.eventId]);

    const isCoordinated = useMemo(() => {
        let coordinated = false;
        if (coordinatedEvents && currentUser) {
            coordinatedEvents.every(event => {
                if (event.eventUserId === currentUser.userId) {
                    coordinated = true;
                    return false;
                }
                return true;
            });
        }
        return coordinated;
    }, [coordinatedEvents,
        currentUser]);

    const isOpen = useMemo(() => {
        return !(isBookmarked || isRegistered || isCoordinated);
    }, [isBookmarked, isRegistered, isCoordinated]);
    //END UTILITY FUNCTIONS

    //START INIT FUNCTIONS
    const initBookmarkButtonText = useMemo(() => {
        if (eventStatus.status === "bookmarked") {
            return "Unbookmark"
        } else {
            return "Bookmark";
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initBookmarkButton = useMemo(() => {
        if (!(eventStatus.status === "registered")) {
            return (
                <Button
                    className={"registerButton me-2 mt-3 btn-sm"}
                    key={"bookmarkButton" + event.eventId}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={removeAddBookmark}
                    type="submit"
                >
                    {initBookmarkButtonText}
                </Button>
            );
        } else {
            return null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initRegisterButton = useMemo(() => {
        if (!(eventStatus.status === "registered")) {
            return (
                <Button
                    className={"registerButton me-2 mt-3 btn-sm"}
                    key={"registerButton" + event.eventId}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={registerThisEvent}
                    type="submit"
                >
                    Register
                </Button>
            );
        } else {
            return null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initUnregisterButton = useMemo(() => {
        return (
            <Button
                className={"unregisteredButton me-2 mt-3 btn-sm"}
                key={"unregisterButton" + event.eventId}
                id="registerFormSubmit"
                onClick={unRegisterEvent}
                variant="warning"
                type="submit"
            >
                Unregister
            </Button>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initDeleteButton = useMemo(() => {
        return (
            <Button
                className={"registerButton me-2 mt-3 btn-sm"}
                key={"deleteButton" + event.eventId}
                id="registerFormSubmit"
                variant="primary"
                onClick={deleteThisEvent}
                type="submit"
            >
                Delete
            </Button>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initVisible = useMemo(() => {
        if(props.option === "register" || props.option === "bookmarkToggle") {
            if(isRegistered || isCoordinated) {
                return false;
            }
        }
        if(eventStatus.isPast) {
            return false;
        }
        return true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //END INIT FUNCTIONS

    //START STATE VARIABLES
    const [bookmarkButtonText, setBookmarkButtonText] = useState(initBookmarkButtonText);
    const [bookmarkButton, setBookmarkButton] = useState(initBookmarkButton);
    const [registerButton, setRegisterButton] = useState(initRegisterButton);
    const unregisterButton = initUnregisterButton;
    const deleteButton = initDeleteButton;
    const [visible, setVisible] = useState(initVisible);
    //END STATE VARIABLES

    //START EFFECTS SECTION
    const isBookmarkedEffect = useCallback(() => {
        if (isBookmarked) {
            setBookmarkButtonText("Unbookmark");
            setEventStatus({
                status: "bookmarked",
                isPast: eventStatus.isPast
            });
        } else {
            setBookmarkButtonText("Bookmark");
        }
    }, [isBookmarked,
        setEventStatus,
        eventStatus.isPast]);

    const isRegisteredEffect = useCallback(() => {
        if (isRegistered) {
            setEventStatus({
                status: "registered",
                isPast: eventStatus.isPast
            });
        }
    }, [isRegistered,
        setEventStatus,
        eventStatus.isPast]);

    const isCoordinatedEffect = useCallback(() => {
        if (isCoordinated) {
            setEventStatus({
                status: "coordinated",
                isPast: eventStatus.isPast
            });
        }
    }, [isCoordinated,
        setEventStatus,
        eventStatus.isPast]);

    const isOpenEffect = useCallback(() => {
        if (isOpen) {
            setEventStatus({
                status: "open",
                isPast: eventStatus.isPast
            });
        }
    }, [isOpen,
        setEventStatus,
        eventStatus.isPast])

    const setHeaderEffect = useCallback(() => {
        const date =
            <h6 className={eventStatus.isPast ? "isPast ms-auto" : "ms-auto"}>
                <strong>Date:</strong> {dateTimeToDate(event.eventDate)}
            </h6>

        if (eventType === "localEvent") {
            switch (eventStatus.status) {
                case 'bookmarked':
                    setHeader(
                        <>
                            <h6 className={"isBookmarked col-7"}>
                                <strong>{event.eventTitle}</strong> | {event.eventOrganization}
                                <em>{" BOOKMARKED"}</em>
                            </h6>
                            {date}
                        </>
                    )
                    break;
                case 'registered':
                    setHeader(
                        <>
                            <h6 className={"isRegistered col-7"}>
                                <strong>{event.eventTitle}</strong> | {event.eventOrganization}
                                <em>{" REGISTERED"}</em>
                            </h6>
                            {date}
                        </>
                    )
                    break;
                case 'coordinated':
                    setHeader(
                        <>
                            <h6 className={"isCoordinated col-7"}>
                                <strong>{event.eventTitle}</strong> | {event.eventOrganization}
                                <em>{" COORDINATING"}</em>
                            </h6>
                            {date}
                        </>
                    )
                    break;
                default:
                    setHeader(
                        <>
                            <h6 className={"col-7"}>
                                <strong>{event.eventTitle}</strong> | {event.eventOrganization}
                            </h6>
                            {date}
                        </>
                    )
                    break;
            }
        } else {
            setHeader(
                <>
                    <h6 className={"col-7"}>
                        <strong>{event.eventTitle}</strong> | {event.eventOrganization}
                    </h6>
                    {date}
                </>
            )
        }
    }, [
        eventType,
        setHeader,
        eventStatus.isPast,
        eventStatus.status,
        event.eventDate,
        event.eventOrganization,
        event.eventTitle]);

    const registerButtonEffect = useCallback(() => {
        if (!(eventStatus.status === "registered")) {
            setRegisterButton(
                <Button
                    className={"registerButton me-2 mt-3 btn-sm"}
                    key={"registerButton" + event.eventId}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={registerThisEvent}
                    type="submit"
                >
                    Register
                </Button>
            );
        } else {
            setRegisterButton(null);
        }
    }, [eventStatus.status,
        event.eventId,
        registerThisEvent]);

    const bookmarkButtonEffect = useCallback(() => {
        if (!(eventStatus.status === "registered")) {
            setBookmarkButton(
                <Button
                    className={"registerButton me-2 mt-3 btn-sm"}
                    key={"bookmarkButton" + event.eventId}
                    id="registerFormSubmit"
                    variant="primary"
                    onClick={removeAddBookmark}
                    type="submit"
                >
                    {bookmarkButtonText}
                </Button>
            );
        } else {
            setBookmarkButton(null);
        }
    }, [eventStatus.status,
        bookmarkButtonText,
        event.eventId,
        removeAddBookmark]);

    const setVisibleEffect = useCallback(() => {
        if(props.option === "register" || props.option === "bookmarkToggle") {
            if(isRegistered || isCoordinated) {
                setVisible(false);
            } else {
                setVisible(true);
            }
        }
    }, [props.option,
        isRegistered,
        isCoordinated,
        setVisible]);
    //END EFFECTS SECTION

    //START EFFECT HOOKS
    useEffect(isBookmarkedEffect, [isBookmarkedEffect]);
    useEffect(isRegisteredEffect, [isRegisteredEffect]);
    useEffect(isCoordinatedEffect, [isCoordinatedEffect]);
    useEffect(isOpenEffect, [isOpenEffect]);
    useEffect(setHeaderEffect, [setHeaderEffect]);
    useEffect(bookmarkButtonEffect, [bookmarkButtonEffect]);
    useEffect(registerButtonEffect, [registerButtonEffect]);
    useEffect(setVisibleEffect, [setVisibleEffect]);
    //END EFFECT HOOKS

    //START BUTTON SET UP FUNCTIONS
    const getButton = (option) => {
        if(visible) {
            switch (option) {
                case "register":
                    return (registerButton);
                case "bookmarkToggle":
                    return (bookmarkButton);
                case "unregister":
                    return (unregisterButton);
                case "delete":
                    return (deleteButton);
                default:
                    return null;
            }
        } else {
            return null;
        }
    }
    //END BUTTON SETUP FUNCTIONS

    return (
        getButton(props.option)
    );
}