import React from "react";
import {Accordion, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {EventListRow} from "./EventListRow";
import {fetchAllEvents} from "../../store/event";
import {fetchEventByUserId} from "../../store/registeredeventsbyuser";
import {fetchBookedMarkedEventByUserId} from "../../store/bookmarkevent";

export function EventList(props) {
    const dispatch = useDispatch();

    //Set up store for All Events
    const allEventsEffect = () => {
        dispatch(fetchAllEvents());
    }
    React.useEffect(allEventsEffect, [dispatch]);
    const allEvents = useSelector(state => state.events ? state.events : []);

    //Set up store for Registered Events
    const registeredEventsEffect = () => {
        dispatch(fetchEventByUserId());
    }
    React.useEffect(registeredEventsEffect, [dispatch]);
    const registeredEvents = useSelector(state => state.registered ? state.registered : []);

    //Set up store for Bookmarked Events
    const bookmarkedEventsEffect = () => {
        dispatch(fetchBookedMarkedEventByUserId());
    }
    React.useEffect(bookmarkedEventsEffect, [dispatch]);
    const bookmarkedEvents = useSelector(state => state.bookmarked ? state.bookmarked : null);

    const eventList = () => {
        switch (props.option) {
            case 'allEvents':
                return eventRows('allEvents', allEvents);
                break;
            case 'registeredEvents':
                return eventRows('registeredEvents', registeredEvents);
                break;
            case 'bookmarkedEvents':
                return eventRows('bookmarkedEvents', bookmarkedEvents);
                break;
        }
        return null;
    }

    return (
        <>
            <Col md={props.colSize} className={"d-block mx-auto " + props.colClass}>
                <div className={"eventAttending text-center py-1"}><h5>Nearby Opportunities</h5></div>
                <Accordion>
                    {eventList()}
                </Accordion>
            </Col>
        </>
    )
}

const eventRows = (option, selector) => {
    if (selector) {
        switch (option) {
            case 'allEvents':
                return selector.map(event =>
                    <EventListRow
                        event={event}
                        key={event.eventId}
                        registerButton={true}
                        bookmarkButton={true}
                    />);
                break;
            case 'registeredEvents':
                return selector.map(event =>
                    <EventListRow
                        key={event.eventId}
                        event={event}
                        unregisterButton={true}
                    />);
                break;
            case 'bookmarkedEvents':
                return selector.map(event =>
                    <EventListRow
                        key={event.eventId}
                        event={event}
                        registerBookmarkButton={true}
                        unbookmarkButton={true}
                    />);
                break;
        }
    }
    return null;
}