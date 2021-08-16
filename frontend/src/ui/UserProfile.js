import React from "react";
import {UserOverview} from "./UserOverview";
import {EventApprovalTable} from "./EventApprovalTable";
import {CreateEventForm} from "./CreateEventForm";
import {EventDetails} from "./EventDetails";


let events = [
    {
        id: 0,
        eventName: 'Save a Pet',
        pointOfContact: 'Andrew',
        eventDescription: 'Blah blah blah'
    },
    {
        id: 1,
        eventName: 'Save a Bird',
        pointOfContact: 'Jericho',
        eventDescription: 'Blah blah blah'
    }
]

let eventDetails = []

events.forEach((event, index) =>{
    eventDetails.push(<EventDetails eventName={event.eventName} pointOfContact={event.pointOfContact} eventDescription={event.eventDescription}/>)

})


export function UserProfile () {
    return (
        <>
            <UserOverview/>
            <EventApprovalTable/>
            <CreateEventForm/>
            {eventDetails}
        </>
    )
}