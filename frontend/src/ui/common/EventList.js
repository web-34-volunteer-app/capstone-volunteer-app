import React, {useContext} from "react";
import {Accordion, Col} from "react-bootstrap";
import {EventListRow} from "./EventListRow";

import {EventListContext, StoreContext} from "../main/Home";

export const EventContext = React.createContext("eventContext");

export function EventList(props) {
    const {
        allEvents,
        coordinatedEvents,
        registeredEvents,
    } = useContext(StoreContext);

    const {
        eventType
    } = useContext(EventListContext);

    const eventList = () => {
        switch (eventType) {
            case 'localEvent':
                return eventRows(eventType, allEvents);
            case 'coordinatedEvent':
                return eventRows(eventType, coordinatedEvents);
            case 'registeredEvent':
                return eventRows(eventType, registeredEvents);
            default:
                return null;
        }
    }

    //Options: localEvent, coordinatedEvent, registeredEvent
    const eventRows = (option, selector) => {
        if(selector) {
            return selector.map(event =>
                <EventContext.Provider
                    value={{event: event}}
                    key={"eventContextProvider"+option+event.eventId}
                >
                    <EventListRow
                        type={option}
                        key={option+event.eventId}
                    />
                </EventContext.Provider>
            );
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

