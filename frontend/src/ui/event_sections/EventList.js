import React from "react";
import {Accordion, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {EventListRow} from "../common/EventListRow";
import {fetchAllEvents} from "../../store/event";
import {fetchEventByUserId} from "../../store/registeredeventsbyuser";

export function EventList(props) {
    const dispatch = useDispatch();

    //Set up store for All Events
    const allEventsEffect = () => {
        dispatch(fetchAllEvents());
    }
    React.useEffect(allEventsEffect, [dispatch])
    const allEvents = useSelector(state => state.events ? state.events : []);

    //Set up store for Registered Events
    // const registeredEventsEffect = () => {
    //     dispatch(fetchEventByUserId())
    // }
    // React.useEffect(registeredEventsEffect, [dispatch])
    // const registeredEvents = useSelector(state => state.registered ? state.registered : []);
    //
    // const eventListOption = () => {
    //     console.log("props.option: " + props.option);
    //     switch (props.option) {
    //         case 'allEvents':
    //             return eventRows('allEvents', allEvents);
    //             break;
    //         case 'registeredEvents':
    //             return eventRows('registeredEvents', registeredEvents);
    //             break;
    //     }
    //     return null;
    // }
    //
    // const eventList = eventListOption();

    return (
        <>
            <Col md={6} className="d-block mx-auto">
                <div className={"eventAttending text-center py-1"}><h5>Nearby Opportunities</h5></div>
                <Accordion>
                    {/*{eventList}*/}
                    {/*{eventRows('allEvents', allEvents)}*/}
                    {allEvents.map(event =>
                        <EventListRow
                            event={event}
                            key={event.eventId}
                            registerButton={true}
                            bookmarkButton={true}
                        />)}
                </Accordion>
            </Col>
        </>
    )
}

// const eventRows = (option, selector) => {
//     if (selector) {
//         switch (option) {
//             case 'allEvents':
//                 return selector.map(event =>
//                     <EventListRow
//                         event={event}
//                         key={event.eventId}
//                         registerButton={true}
//                         bookmarkButton={true}
//                     />)
//                 break;
//             case 'registeredEvents':
//                 return selector.map(event =>
//                     <EventListRow
//                         key={event.eventId}
//                         event={event}
//                         unregisterButton={true}
//                     />)
//                 break;
//         }
//     }
//     return null;
// }