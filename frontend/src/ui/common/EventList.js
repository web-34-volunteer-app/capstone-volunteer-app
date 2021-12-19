import React, {useContext} from "react";
import {Accordion, Col} from "react-bootstrap";
import {EventListRow} from "./EventListRow";

import {StoreContext} from "../main/Home";

export function EventList(props) {
    const {
        allEvents,
        coordinatedEvents,
        registeredEvents,
    } = useContext(StoreContext);

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
                        <EventListRow
                            type={'localEvent'}
                            event={event}
                            key={'localEvent' + event.eventId}
                            registerButton={true}
                            bookmarkButton={true}
                        />);
                case 'coordinatedEvents':
                    return selector.map(event =>
                        <EventListRow
                            type={'coordinatedEvent'}
                            event={event}
                            key={'coordinatedEvent' + event.eventId}
                            deleteButton={true}
                        />);
                case 'registeredEvents':
                    return selector.map(event =>
                        <EventListRow
                            type={'registeredEvent'}
                            event={event}
                            key={'registeredEvent' + event.eventId}
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

