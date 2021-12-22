import React, {useState, useEffect, useContext, useCallback} from "react";
import {EventListContext, MapContext, StoreContext} from "../main/Home";
import {Accordion, AccordionContext} from "react-bootstrap";
import {VolunteerList} from "./VolunteerList";

import {dateTimeToDate, dateTimeToTime} from "../dateFormat";
import {ValidateHoursVolunteerForm} from "../forms/ValidateHoursVolunteerForm";
import {EventButton} from "./EventButton";
import {EventContext} from "./EventList";

export const EventStatusContext = React.createContext("eventStatusContext");

export const EventListRow = (props) => {
    //START PROPS AND CONTEXTS SETUP
    const {setActiveEvent} = useContext(MapContext);
    const {activeEventKey} = useContext(AccordionContext);
    const {eventType} = useContext(EventListContext);
    const {event} = useContext(EventContext);
    const {
        auth,
        currentUser,
        allEvents,
        coordinatedEvents,
        registeredEvents,
        bookmarkedEvents
    } = useContext(StoreContext);
    //END PROPS AND CONTEXTS SETUP

    //START INIT STATUS FUNCTIONS
    const initIsBookmarked = () => {
        let bookmarked = false;
        if (bookmarkedEvents) {
            bookmarkedEvents.every(bookmark => {
                if (bookmark.eventId === event.eventId) {
                    bookmarked = true;
                    return false;
                }
                return true;
            });
        }
        return bookmarked;
    }

    const initIsRegistered = () => {
        let isRegistered = false;
        if (registeredEvents) {
            registeredEvents.every(registeredEvent => {
                if (registeredEvent.eventId === event.eventId) {
                    isRegistered = true;
                    return false;
                }
                return true;
            });
        }
        return isRegistered;
    }

    const initIsCoordinated = () => {
        let isCoordinated = false;
        if (coordinatedEvents && currentUser) {
            coordinatedEvents.every(event => {
                if (event.eventUserId === currentUser.userId) {
                    isCoordinated = true;
                    return false;
                }
                return true;
            });
        }
        return isCoordinated;
    }

    const initEventStatus = () => {
        let status = "open";
        if (eventType === 'localEvent') {
            if (initIsBookmarked()) {
                status = "bookmarked";
            } else if (initIsRegistered()) {
                status = "registered";
            } else if (initIsCoordinated()) {
                status = "coordinated";
            }
        }
        return (
            {
                status: status,
                isPast: isPast(event.eventEndTime)
            }
        );
    }

    const initHeader = () => {
        const date =
            <h6 className={initEventStatus().isPast ? "isPast ms-auto" : "ms-auto"}>
                <strong>Date:</strong> {dateTimeToDate(event.eventDate)}
            </h6>

        if (eventType === 'localEvent') {
            switch (initEventStatus().status) {
                case 'bookmarked':
                    return (
                        <>
                            <h6 className={"isBookmarked col-7"}>
                                <strong>{event.eventTitle}</strong> | {event.eventOrganization}
                                <em>{" BOOKMARKED"}</em>
                            </h6>
                            {date}
                        </>
                    )
                case 'registered':
                    return (
                        <>
                            <h6 className={"isRegistered col-7"}>
                                <strong>{event.eventTitle}</strong> | {event.eventOrganization}
                                <em>{" REGISTERED"}</em>
                            </h6>
                            {date}
                        </>
                    )
                case 'coordinated':
                    return (
                        <>
                            <h6 className={"isCoordinated col-7"}>
                                <strong>{event.eventTitle}</strong> | {event.eventOrganization}
                                <em>{" COORDINATING"}</em>
                            </h6>
                            {date}
                        </>
                    )
                default:
                    return (
                        <>
                            <h6 className={"col-7"}>
                                <strong>{event.eventTitle}</strong> | {event.eventOrganization}
                            </h6>
                            {date}
                        </>
                    )
            }
        } else {
            return (
                <>
                    <h6 className={"col-7"}>
                        <strong>{event.eventTitle}</strong> | {event.eventOrganization}
                    </h6>
                    {date}
                </>
            )
        }
    }

    const initEventVisible = () => {
        if (eventType === "localEvent") {
            if (initEventStatus().isPast) {
                return false;
            }
        }
        return true;
    }
    //END INIT STATUS FUNCTIONS

    //START STATE HOOKS
    const [eventStatus, setEventStatus] = useState(initEventStatus());
    const [header, setHeader] = useState(initHeader());
    const [eventVisible, setEventVisible] = useState(initEventVisible());
    //END STATE HOOKS

    //START UTILITY FUNCTIONS
    const getEvent = useCallback((eventId) => {
        let targetEvent = null;
        allEvents.forEach(event => {
            if (event.eventId === eventId) {
                targetEvent = event;
            }
        });
        return targetEvent;
    }, [allEvents]);
    //END UTILITY FUNCTION

    //START EFFECTS SECTION
    const mapPopupFromLocalEventEffect = useCallback(() => {
        if (eventType === "localEvent") {
            if (activeEventKey) {
                setActiveEvent(getEvent(activeEventKey));
            } else {
                setActiveEvent(null);
            }
        }
    }, [
        eventType,
        activeEventKey,
        setActiveEvent,
        getEvent
    ]);

    const setIsPastEventEffect = useCallback(() => {
        setEventStatus({
            status: eventStatus.status,
            isPast: isPast(event.eventEndTime)
        });
    }, [setEventStatus,
        eventStatus.status,
        event.eventEndTime]);
    //END EFFECTS SECTION

    //START MAP POPUP TOGGLE
    useEffect(mapPopupFromLocalEventEffect, [mapPopupFromLocalEventEffect]);
    //END MAP POPUP TOGGLE

    //START PAST EVENT
    useEffect(setIsPastEventEffect, [setIsPastEventEffect]);
    //END PAST EVENT

    //useEffect(setHeaderEffect, [setHeaderEffect]);

    //START VOLUNTEER LIST COMPONENT
    const getVolunteerList = useCallback(() => {
        return (
            <VolunteerList
                key={'volunteerList' + event.eventId}
                event={event}
                isPast={eventStatus.isPast}
            />
        );
    }, [event, eventStatus.isPast]);
    //END VOLUNTEER LIST COMPONENT

    //START VALIDATE HOURS FORM COMPONENT
    const displayValidateHoursForm = useCallback(() => {
        if (eventStatus.isPast && currentUser) {
            return (
                <ValidateHoursVolunteerForm
                    key={'validateHoursForm' + event.eventId}
                    event={event}
                    user={currentUser}
                />);
        }
    }, [eventStatus.isPast, currentUser, event]);
    //END VALIDATE HOURS FORM COMPONENT

    //START EVENT FUNCTIONAL COMPONENTS SECTION
    const getEventButton = useCallback((option) => {
        return (
            <EventStatusContext.Provider
                value={{
                    eventStatus: eventStatus,
                    setEventStatus: setEventStatus,
                    header: header,
                    setHeader: setHeader
                }}
                key={"eventStatusContextProvider" + option}
            >
                <EventButton
                    option={option}
                    key={"eventButton" + option + event.eventId}
                />
            </EventStatusContext.Provider>
        );
    }, [eventStatus,
        setEventStatus,
        header,
        event.eventId]);

    const displayInnerComponents = useCallback(() => {
        let components = [];
        switch (eventType) {
            case "localEvent":
                if (currentUser) {
                    if (currentUser.userId === event.eventUserId) {
                        return components;
                    }
                }
                components.push(getEventButton("register"));
                components.push(getEventButton("bookmarkToggle"));
                return components;
            case "coordinatedEvent":
                components.push(getVolunteerList());
                components.push(getEventButton("delete"));
                return components;
            case "registeredEvent":
                components.push(getEventButton("unregister"));
                if (eventStatus.isPast) {
                    components.push(displayValidateHoursForm());
                }
                return components;
            default:
                return components;
        }
    }, [eventType,
        currentUser,
        event.eventUserId,
        eventStatus,
        getEventButton,
        getVolunteerList,
        displayValidateHoursForm]);
    //END EVENT FUNCTION COMPONENTS SECTION

    //START EVENT HEADER SECTION
    // const headerEffectCallback = useCallback(headerEffect, [headerEffect]);

    //END EVENT HEADER SECTION

    //START VISIBILITY FUNCTION
    useEffect(() => {
        if (eventType === "localEvent") {
            if (eventStatus.isPast) {
                setEventVisible(false);
            }
        } else {
            setEventVisible(true);
        }
    }, [eventStatus.isPast, eventType]);
    //END VISIBILITY FUNCTION

    const displayComponents = () => {
        const component =
            eventVisible ?
                (<Accordion.Item eventKey={event.eventId}>
                    <Accordion.Header>
                        {header}
                    </Accordion.Header>
                    <Accordion.Body>
                        <p><strong>Description: </strong>{event.eventDescription}</p>
                        <p><strong>Start Time: </strong> {dateTimeToTime(event.eventStartTime)} | <strong>End
                            Time:</strong> {dateTimeToTime(event.eventEndTime)}</p>
                        <p><strong>Address:</strong> {event.eventAddress} </p>
                        <p><strong>Transportation
                            provided?</strong> {event.eventDescriptionTransportation ? "Yes" : "No"}
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

const isPast = (pastDate) => {
    const today = new Date();
    const eventDate = new Date(pastDate);
    const past = today.getTime() > eventDate.getTime();
    return (past);
}