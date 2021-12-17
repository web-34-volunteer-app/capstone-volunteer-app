import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllEvents} from "../../store/event";
import {fetchRegisteredEventByUserId} from "../../store/eventsregisteredbyuser";
import {fetchBookmarkedEventByUserId} from "../../store/eventsbookmarkedbycurrentuser";
import {fetchCoordinatedEventByUserId} from "../../store/eventscoordinatedbycurrentuser";

import {EventListRow} from "./EventListRow";
import {Accordion, Col} from "react-bootstrap";
import {isPast} from "../dateFormat";

export function EventList(props) {
    const dispatch = useDispatch();

    //Set up store for All Events
    const allEventsEffect = () => {
        dispatch(fetchAllEvents());
    }
    React.useEffect(allEventsEffect, [dispatch]);
    const allEvents = useSelector(state => state.events ? state.events : []);

    //Set up store for Coordinated Events
    const coordinatedEventsEffect = () => {
        dispatch(fetchCoordinatedEventByUserId());
    }
    React.useEffect(coordinatedEventsEffect, [dispatch]);
    const coordinatedEvents = useSelector(state => state.coordinated ? state.coordinated : []);

    //Set up store for Registered Events
    const registeredEventsEffect = () => {
        dispatch(fetchRegisteredEventByUserId());
    }
    React.useEffect(registeredEventsEffect, [dispatch]);
    const registeredEvents = useSelector(state => state.registered ? state.registered : []);

    //Set up store for Bookmarked Events
    const bookmarkedEventsEffect = () => {
        dispatch(fetchBookmarkedEventByUserId());
    }
    React.useEffect(bookmarkedEventsEffect, [dispatch]);
    const bookmarkedEvents = useSelector(state => state.bookmarked ? state.bookmarked : null);

    const eventList = () => {
        switch (props.option) {
            case 'allEvents':
                return eventRows('allEvents', allEvents);
            case 'coordinatedEvents':
                return eventRows('coordinatedEvents', coordinatedEvents);
            case 'registeredEvents':
                return eventRows('registeredEvents', registeredEvents);
            default:
                return null;
        }
    }

    const eventRows = (option, selector) => {
        if (selector) {
            switch (option) {
                case 'allEvents':
                    return selector.map(event =>
                        !isPast(event.eventEndTime) ?
                            <EventListRow
                                type={'localEvent'}
                                event={event}
                                key={'localEvent'+event.eventId}
                                registerButton={true}
                                bookmarkButton={true}
                                setActiveEvent={props.setActiveEvent}
                                activeEvent={props.activeEvent}
                                eventIsActive={props.eventIsActive}
                            /> : null);
                case 'coordinatedEvents':
                    return selector.map(event =>
                        <EventListRow
                            type={'coordinatedEvent'}
                            event={event}
                            key={'coordinatedEvent'+event.eventId}
                            deleteButton={true}
                        />);
                case 'registeredEvents':
                    return selector.map(event =>
                        <EventListRow
                            type={'registeredEvent'}
                            event={event}
                            key={'registeredEvent'+event.eventId}
                            unregisterButton={true}
                        />);
                default:
                    return null;
            }
        }
        return null;
    }

    return (
        <>
            <Col md={props.colSize} className={"d-block mx-auto " + props.colClass}>
                <div className={"eventAttending text-center py-1"}><h5>{props.header}</h5></div>
                <Accordion defaultActiveKey={0}>
                    {eventList()}
                </Accordion>
            </Col>
        </>
    )
}

