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

    //START Bookmarked Events Section

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
    const [isBookmarked, setIsBookmarked] = useState(bookmarkButtonText !== "Bookmark");

    //Handle bookmark toggle: Check if event matches any bookmarked events, sets bookmark button accordingly
    const handleBookmarkToggle = () => {
        let valueSet = false;
        if (bookmarkedEvents) {
            bookmarkedEvents.forEach(bookmark => {
                if (bookmark.eventId === props.event.eventId) {
                    setBookmarkButtonText("Unbookmark");
                    setIsBookmarked(true);
                    valueSet = true;
                    return null;
                }
            })
        }
        if (!valueSet) {
            setBookmarkButtonText("Bookmark");
            setIsBookmarked(false);
        }
    };

    useEffect(() => {
        handleBookmarkToggle();
    }, [dispatch, bookmarkedEvents]);
    //END Bookmarked Events Section

    //START Registered Events Section

    const registerThisEvent = () => {
        httpConfig.post(`/apis/volunteer/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchUsersForCoordinator());
                    dispatch(fetchVolunteersForCoordinator());
                    dispatch(fetchRegisteredEventByUserId());
                }
            });
        //console.log("Registered Events: " + JSON.stringify(registeredEvents));
    }

    useEffect(() => {
        //console.log("Registered Events: " + JSON.stringify(registeredEvents));
    }, [registeredEvents])

    const registerBookmarkedEvent = () => {
        registerThisEvent();
        removeAddBookmark();
    }

    const removeAddBookmark = () => {
        httpConfig.post(`/apis/bookmarkedEvent/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchBookmarkedEventByUserId());
                }
            })
    }

    const unRegisterEvent = () => {
        httpConfig.delete(`/apis/volunteer/deleteSelf/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchRegisteredEventByUserId());
                    dispatch(fetchUsersForCoordinator());
                    dispatch(fetchVolunteersForCoordinator());
                }
            });
        //console.log("Registered events: " + JSON.stringify(registeredEvents));
    }

    const initIsRegistered = () => {
        let isRegistered = false;
        if (registeredEvents) {
            registeredEvents.forEach(event => {
                if (event.eventId === props.event.eventId) {
                    isRegistered = true;
                    return null;
                }
            })
        }
        return isRegistered;
    }

    const [isRegistered, setIsRegistered] = useState(initIsRegistered);

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

    const [registerButton, setRegisterButton] = useState(initRegisterButton());
    const [bookmarkButton, setBookmarkButton] = useState(initBookmarkButton());
    const unregisterButton = initUnregisterButton();

    const handleRegisterEvent = () => {
        let valueSet = false;
        if (registeredEvents) {
            registeredEvents.forEach(event => {
                if (event.eventId === props.event.eventId) {
                    setIsRegistered(true);
                    setRegisterButton(null);
                    setBookmarkButton(null);
                    valueSet = true;
                    return null;
                }
            })
        }
        if (!valueSet) {
            setIsRegistered(false);
            setRegisterButton(initRegisterButton());
            setBookmarkButton(initBookmarkButton());
        }
        //console.log("register button: " + registerButton + ", isRegistered: " + isRegistered);
    }

    useEffect(() => {
        handleRegisterEvent();
    }, [dispatch, registeredEvents]);
    //END Registered Events Section

    //START Coordinated Events Section

    const initIsCoordinated = () => {
        let isCoordinated = false;
        if (coordinatedEvents && currentUser) {
            coordinatedEvents.forEach(event => {
                if (event.eventUserId === currentUser.userId) {
                    isCoordinated = true;
                    return null;
                }
            })
        }
        return isCoordinated;
    }

    const [isCoordinated, setIsCoordinated] = useState(initIsCoordinated());

    useEffect(() => {
        setIsCoordinated(initIsCoordinated());
    })

    //END Coordinated Events Section

    //START Fetch Functions
    const deleteThisEvent = () => {
        httpConfig.delete(`/apis/event/eventId/${props.event.eventId}`)
            .then(reply => {
                if (reply.status === 200) {
                    dispatch(fetchAllEvents());
                    dispatch(fetchCoordinatedEventByUserId());
                    alert("Event Deleted");
                }
            })
    }
    //END Fetch Functions

    //START Component Set Up Functions
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

    const displayComponents = () => {
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

    const displayHeader = () => {
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

        let date =
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
    //END Component Set Up Functions

    console.log("Creating EventListRow type: " + props.type);

    return (
        <Accordion.Item eventKey={props.event.eventId}>
            <Accordion.Header>
                {displayHeader()}
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