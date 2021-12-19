import React, {useState, useEffect, useContext, useCallback} from "react";
import {MapContext, StoreContext} from "../main/Home";
import {Accordion, AccordionContext, Button} from "react-bootstrap";
import {VolunteerList} from "./VolunteerList";

import {fetchBookmarkedEventByUserId} from "../../store/eventsbookmarkedbycurrentuser";
import {fetchRegisteredEventByUserId} from "../../store/eventsregisteredbyuser";
import {fetchUsersForCoordinator} from "../../store/usersForCoordinator";
import {fetchVolunteersForCoordinator} from "../../store/volunteersForCoordinator";
import {fetchAllEvents} from "../../store/event";
import {fetchCoordinatedEventByUserId} from "../../store/eventscoordinatedbycurrentuser";
import {httpConfig} from "../../utils/httpConfig";

import {dateTimeToDate, dateTimeToTime} from "../dateFormat";
import {ValidateHoursVolunteerForm} from "../forms/ValidateHoursVolunteerForm";


export const EventListRow = (props) => {
    const {
        setActiveEvent
    } = useContext(MapContext);

    const {
        dispatch,
        auth,
        currentUser,
        allEvents,
        coordinatedEvents,
        registeredEvents,
        bookmarkedEvents
    } = useContext(StoreContext);

    //START MAP POPUP TOGGLE
    const {activeEventKey} = useContext(AccordionContext);

    const getEvent = useCallback((eventId) => {
        let thisEvent = null;
        allEvents.forEach(event => {
            if (event.eventId === eventId) {
                thisEvent = event;
            }
        });
        return thisEvent;
    }, [allEvents]);

    const mapPopupFromLocalEventEffect = useCallback(() => {
        if (props.type === "localEvent") {
            if (activeEventKey) {
                setActiveEvent(getEvent(activeEventKey));
            } else {
                setActiveEvent(null);
            }
        }
    }, [
        props.type,
        activeEventKey,
        setActiveEvent,
        getEvent
    ]);

    useEffect(() => {
        mapPopupFromLocalEventEffect();
    }, [mapPopupFromLocalEventEffect]);
    //END MAP POPUP TOGGLE

    //START PAST EVENT
    const isPast = useCallback((pastDate) => {
        const today = new Date();
        const eventDate = new Date(pastDate);
        const past = today.getTime() > eventDate.getTime();
        return (past);
    }, []);

    const [isPastEvent, setIsPastEvent] = useState(isPast(props.event.eventEndTime));

    const setIsPastEventEffect = useCallback(() => {
        setIsPastEvent(isPast(props.event.eventEndTime));
    }, [setIsPastEvent, isPast, props.event.eventEndTime]);

    useEffect(() => {
        setIsPastEventEffect();
    }, [setIsPastEventEffect]);
    //END PAST EVENT

    //START FETCH FUNCTIONS
    const registerThisEvent = useCallback(() => {
        httpConfig.post(`/apis/volunteer/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchUsersForCoordinator());
                    dispatch(fetchVolunteersForCoordinator());
                    dispatch(fetchRegisteredEventByUserId());
                }
            });
    },[dispatch, props.event.eventId]);

    const removeAddBookmark = useCallback(() => {
        httpConfig.post(`/apis/bookmarkedEvent/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchBookmarkedEventByUserId());
                }
            })
    }, [dispatch, props.event.eventId]);

    const registerBookmarkedEvent = useCallback(() => {
        registerThisEvent();
        removeAddBookmark();
    }, [registerThisEvent, removeAddBookmark]);

    const unRegisterEvent = useCallback(() => {
        httpConfig.delete(`/apis/volunteer/deleteSelf/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchRegisteredEventByUserId());
                    dispatch(fetchUsersForCoordinator());
                    dispatch(fetchVolunteersForCoordinator());
                }
            });
    }, [dispatch, props.event.eventId]);

    const deleteThisEvent = useCallback(() => {
        httpConfig.delete(`/apis/event/eventId/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchAllEvents());
                    dispatch(fetchCoordinatedEventByUserId());
                    alert("Event Deleted");
                }
            })
    }, [dispatch, props.event.eventId]);
    //END FETCH FUNCTIONS

    //START BOOKMARKED EVENTS
    const initButtonText = () => {
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

    const [bookmarkButtonText, setBookmarkButtonText] = useState(initButtonText());
    const [isBookmarked, setIsBookmarked] = useState(bookmarkButtonText !== "Bookmark");

    const bookmarksEffect = useCallback(() => {
        let valueSet = false
        if(bookmarkedEvents) {
            bookmarkedEvents.forEach(bookmark => {
                if(bookmark.eventId === props.event.eventId) {
                    setBookmarkButtonText("Unbookmark");
                    setIsBookmarked(true);
                    valueSet = true;
                }
            })
        }
        if(!valueSet) {
            setBookmarkButtonText("Bookmark");
            setIsBookmarked(false);
        }
    }, [bookmarkedEvents, props.event.eventId]);

    useEffect(bookmarksEffect,[bookmarksEffect]);
    //END BOOKMARKED EVENTS

    //START REGISTERED EVENTS
    const initIsRegistered = () => {
        let isRegistered = false;
        if (registeredEvents) {
            registeredEvents.forEach(event => {
                if (event.eventId === props.event.eventId) {
                    isRegistered = true;
                    return null;
                }
            });
        }
        return isRegistered;
    }

    const [isRegistered, setIsRegistered] = useState(initIsRegistered);

    const isRegisteredEffect = useCallback(() => {
        let valueSet = false;
        if(registeredEvents) {
            registeredEvents.forEach(event => {
                if (event.eventId === props.event.eventId) {
                    setIsRegistered(true);
                    valueSet = true;
                    return null;
                }
            });
        }
        if(!valueSet) {
            setIsRegistered(false);
        }
    }, [registeredEvents, props.event.eventId]);
    useEffect(isRegisteredEffect, [isRegisteredEffect]);

    const initBookmarkButton = () => {
        if (!isRegistered) {
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
            );
        } else {
            return null;
        }
    }

    const [bookmarkButton, setBookmarkButton] = useState(initBookmarkButton());

    useEffect(() => {
        if (!isRegistered) {
            setBookmarkButton (
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
            );
        } else {
            setBookmarkButton(null);
        }
    }, [isRegistered, bookmarkButtonText, props.event.eventId, removeAddBookmark]);

    const initRegisterButton = () => {
        if (!isRegistered) {
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
            );
        } else {
            return null;
        }
    }

    const [registerButton, setRegisterButton] = useState(initRegisterButton());

    const registerButtonEffect = useCallback(() => {
        if (!isRegistered) {
            setRegisterButton(
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
            );
        } else {
            setRegisterButton(null);
        }
    }, [isRegistered, props.event.eventId, registerThisEvent]);

    useEffect(registerButtonEffect, [registerButtonEffect]);

    const initUnregisterButton = () => {
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
    }

    const unregisterButton = initUnregisterButton();
    //END REGISTERED EVENTS

    //START COORDINATED EVENTS
    const initIsCoordinated = () => {
        let isCoordinated = false;
        if (coordinatedEvents && currentUser) {
            coordinatedEvents.forEach(event => {
                if (event.eventUserId === currentUser.userId) {
                    isCoordinated = true;
                    return null;
                }
            });
        }
        return isCoordinated;
    }

    const [isCoordinated, setIsCoordinated] = useState(initIsCoordinated());

    const isCoordinatedEffect = useCallback(() => {
        let valueSet = false;
        if (coordinatedEvents && currentUser) {
            coordinatedEvents.forEach(event => {
                if(event.eventUserId === currentUser.userId) {
                    setIsCoordinated(true);
                    valueSet = true;
                    return null;
                }
            });
        }
        if(!valueSet) {
            setIsCoordinated(false);
        }
    }, [coordinatedEvents, currentUser]);

    useEffect(isCoordinatedEffect, [isCoordinatedEffect]);
    //END COORDINATED EVENTS

    //START COMPONENT SET UP FUNCTIONS
    const getButton = (option) => {
        switch (option) {
            case "register":
                return (
                    registerButton
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
                return (bookmarkButton);
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
                return (unregisterButton);
            default:
                return null;
        }
    }

    const getVolunteerList = () => {
        return (
            <VolunteerList
                key={'volunteerList' + props.event.eventId}
                event={props.event}
                isPast={isPastEvent}
            />
        )
    }

    const displayValidateHoursForm = () => {
        if (isPastEvent && currentUser) {
            return (
                <ValidateHoursVolunteerForm
                    key={'validateHoursForm' + props.event.eventId}
                    event={props.event}
                    user={currentUser}
                />)
        }
    }

    const displayInnerComponents = () => {
        let components = [];
        switch (props.type) {
            case "localEvent":
                if (currentUser) {
                    if (currentUser.userId === props.event.eventUserId) {
                        return components;
                    }
                }
                if (!isRegistered) {
                    components.push(registerButton);
                    components.push(bookmarkButton);
                }
                return components;
            case "coordinatedEvent":
                components.push(getVolunteerList());
                if (!isPastEvent) {
                    components.push(getButton("delete"));
                }
                return components;
            case "registeredEvent":
                if (!isPastEvent) {
                    components.push(unregisterButton);
                } else {
                    components.push(displayValidateHoursForm());
                }
                return components;
            case "bookmarkedEvent":
                components.push(getButton("bookmarkRegister"));
                components.push(getButton("bookmarkRemove"));
                return components;
            default:
                return components;
        }
    }



    const initHeader = () => {
        let status;
        if (props.type === 'localEvent') {
            if (isBookmarked) {
                status = "bookmarked";
            }
            if (isRegistered) {
                status = "registered";
            }
            if (isCoordinated) {
                status = "coordinated";
            }
        }

        const date =
            <h6 className={isPastEvent ? "isPast ms-auto" : "ms-auto"}>
                <strong>Date:</strong> {dateTimeToDate(props.event.eventDate)}
            </h6>

        switch (status) {
            case 'bookmarked':
                return (
                    <>
                        <h6 className={"isBookmarked col-7"}>
                            <strong>{props.event.eventTitle}</strong> | {props.event.eventOrganization}
                            <em>{" BOOKMARKED"}</em>
                        </h6>
                        {date}
                    </>
                )
            case 'registered':
                return (
                    <>
                        <h6 className={"isRegistered col-7"}>
                            <strong>{props.event.eventTitle}</strong> | {props.event.eventOrganization}
                            <em>{" REGISTERED"}</em>
                        </h6>
                        {date}
                    </>
                )
            case 'coordinated':
                return (
                    <>
                        <h6 className={"isCoordinated col-7"}>
                            <strong>{props.event.eventTitle}</strong> | {props.event.eventOrganization}
                            <em>{" COORDINATING"}</em>
                        </h6>
                        {date}
                    </>
                )
            default:
                return (
                    <>
                        <h6 className={"col-7"}>
                            <strong>{props.event.eventTitle}</strong> | {props.event.eventOrganization}
                        </h6>
                        {date}
                    </>
                )
        }
    }

    const [header, setHeader] = useState(initHeader());

    const headerEffect = useCallback(() => {
        let status;
        if (props.type === 'localEvent') {
            if (isBookmarked) {
                status = "bookmarked";
            }
            if (isRegistered) {
                status = "registered";
            }
            if (isCoordinated) {
                status = "coordinated";
            }
        }

        const date =
            <h6 className={isPastEvent ? "isPast ms-auto" : "ms-auto"}>
                <strong>Date:</strong> {dateTimeToDate(props.event.eventDate)}
            </h6>

        switch (status) {
            case 'bookmarked':
                setHeader (
                    <>
                        <h6 className={"isBookmarked col-7"}>
                            <strong>{props.event.eventTitle}</strong> | {props.event.eventOrganization}
                            <em>{" BOOKMARKED"}</em>
                        </h6>
                        {date}
                    </>
                )
                break;
            case 'registered':
                setHeader (
                    <>
                        <h6 className={"isRegistered col-7"}>
                            <strong>{props.event.eventTitle}</strong> | {props.event.eventOrganization}
                            <em>{" REGISTERED"}</em>
                        </h6>
                        {date}
                    </>
                )
                break;
            case 'coordinated':
                setHeader (
                    <>
                        <h6 className={"isCoordinated col-7"}>
                            <strong>{props.event.eventTitle}</strong> | {props.event.eventOrganization}
                            <em>{" COORDINATING"}</em>
                        </h6>
                        {date}
                    </>
                )
                break;
            default:
                setHeader (
                    <>
                        <h6 className={"col-7"}>
                            <strong>{props.event.eventTitle}</strong> | {props.event.eventOrganization}
                        </h6>
                        {date}
                    </>
                )
                break;
        }
    }, [isBookmarked,
        isRegistered,
        isCoordinated,
        isPastEvent,
        props.event.eventDate,
        props.event.eventOrganization,
        props.event.eventTitle,
        props.type
    ])

    useEffect(headerEffect, [headerEffect]);
    //END Component Set Up Functions

    const initEventVisible = () => {
        if (props.type === "localEvent") {
            if (isPastEvent) {
                return false;
            }
        }
        return true;
    }

    const [eventVisible, setEventVisible] = useState(initEventVisible());

    useEffect(() => {
        if (props.type === "localEvent") {
            if (isPastEvent) {
                setEventVisible(false);
            }
        } else {
            setEventVisible(true);
        }
    }, [isPastEvent, props.type]);

    const displayComponents = () => {
        const component =
            eventVisible ?
            (<Accordion.Item eventKey={props.event.eventId}>
                <Accordion.Header>
                    {header}
                </Accordion.Header>
                <Accordion.Body>
                    <p><strong>Description: </strong>{props.event.eventDescription}</p>
                    <p><strong>Start Time: </strong> {dateTimeToTime(props.event.eventStartTime)} | <strong>End
                        Time:</strong> {dateTimeToTime(props.event.eventEndTime)}</p>
                    <p><strong>Address:</strong> {props.event.eventAddress} </p>
                    <p><strong>Transportation
                        provided?</strong> {props.event.eventDescriptionTransportation ? "Yes" : "No"}
                    </p>
                    {auth ? displayInnerComponents() : null}
                </Accordion.Body>
            </Accordion.Item>)
            :
            null;
        return component;
    }

    return (
        displayComponents()
    )
}