import React, {useContext} from "react";
import {EventContext} from "./EventList";
import {Accordion} from "react-bootstrap";
import {EventForumButton} from "./EventForumButton";
import {MessageThreadList} from "./MessageThreadList";

export const EventForum = () => {
    const {event} = useContext(EventContext);

    const getForum = () => {
        return (
            <>
                <div className={"eventAttending text-center py-1"}><h5>Messages</h5></div>
                <Accordion defaultActiveKey={0}>
                    <MessageThreadList/>
                    <EventForumButton option={"message"}/>
                </Accordion>
            </>

        )
    }

    return (getForum());
}