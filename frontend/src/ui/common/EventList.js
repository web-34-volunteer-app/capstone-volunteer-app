import React from "react";
import {Accordion, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {EventListRow} from "./EventListRow";
import {fetchAllEvents} from "../../store/event";
import {fetchEventByUserId} from "../../store/registeredeventsbyuser";
import {fetchBookmarkedEventByUserId} from "../../store/bookmarkevent";

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
        dispatch(fetchBookmarkedEventByUserId());
    }
    React.useEffect(bookmarkedEventsEffect, [dispatch]);
    const bookmarkedEvents = useSelector(state => state.bookmarked ? state.bookmarked : null);

    const eventList = () => {
        switch (props.option) {
            case 'allEvents':
                return eventRows('allEvents', allEvents);
            case 'registeredEvents':
                return eventRows('registeredEvents', registeredEvents);
            case 'bookmarkedEvents':
                return eventRows('bookmarkedEvents', bookmarkedEvents);
            default:
                return null;
        }
    }

    return (
        <>
            <Col md={props.colSize} className={"d-block mx-auto " + props.colClass}>
                <div className={"eventAttending text-center py-1"}><h5>Nearby Opportunities</h5></div>
                <Accordion defaultActiveKey={0}>
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
                        key={'localEvent'+event.eventId}
                        registerButton={true}
                        bookmarkButton={true}
                    />);
            case 'registeredEvents':
                return selector.map(event =>
                    <EventListRow
                        key={'registeredEvent'+event.eventId}
                        event={event}
                        unregisterButton={true}
                    />);
            case 'bookmarkedEvents':
                return selector.map(event =>
                    <EventListRow
                        key={'bookmarkedEvent'+event.eventId}
                        event={event}
                        registerBookmarkButton={true}
                        unbookmarkButton={true}
                    />);
            default:
                return null;
        }
    }
    return null;
}