import React, {useEffect, useState} from "react";
import {EventListContext, StoreContext} from "../main/Home";
import {useCallback, useContext, useMemo} from "react";
import {EventContext} from "./EventList";
import {EventStatusContext} from "./EventListRow";
import {fetchMessages} from "../../store/messages";
import {httpConfig} from "../../utils/httpConfig";
import {Button} from "react-bootstrap";

export const EventForumButton = (props) => {
    const {
        dispatch,
        messages
    } = useContext(StoreContext);

    const {event} = useContext(EventContext);
    const {eventType} = useContext(EventListContext);
    const {eventStatus} = useContext(EventStatusContext);

    //START FETCH FUNCTIONS
    const messageEventParent = useCallback(() => {
        if (event) {
            httpConfig.post(`/apis/message/eventParent/${event.eventId}`)
                .then(reply => {
                    if (reply.status === 200) {
                        dispatch(fetchMessages());
                    }
                })
        }
    }, [dispatch, event]);

    const messageMessageParent = useCallback((parentId) => {
        if (messages) {
            httpConfig.post(`/apis/message/messageParent/${parentId}`)
                .then(reply => {
                    if (reply.status === 200) {
                        dispatch(fetchMessages());
                    }
                })
        }
    }, [dispatch, messages]);
    //END FETCH FUNCTIONS

    //START INIT FUNCTIONS
    const initMessageForumButton = useMemo(() => {
        console.log("initMessageForumButton");
        if(eventType) {
            console.log("eventType: " + eventType);
            if (eventType === "registeredEvent" || eventType === "coordinatedEvent") {
                return (
                    <Button
                        className={"registerButton me-2 mt-3 btn-sm"}
                        key={"messageForumButton" + event.eventId}
                        id="registerFormSubmit"
                        variant="primary"
                        onClick={messageEventParent}
                        type="submit"
                    >
                        Add Message
                    </Button>
                );
            }
        }
        console.log("Returning null.");
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initReplyForumButton = useMemo(() => {
        console.log("initReplyForumButton");
        if(eventType) {
            console.log("eventType: " + eventType);
            if (eventType === "registeredEvent" || eventType === "coordinatedEvent") {
                return (
                    <Button
                        className={"registerButton me-2 mt-3 btn-sm"}
                        key={"replyForumButton" + event.eventId}
                        id="registerFormSubmit"
                        variant="primary"
                        onClick={messageMessageParent}
                        type="submit"
                    >
                        Reply
                    </Button>
                );
            }
        }
        console.log("Returning null.");
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const initVisible = useMemo(() => {
        return true;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    //END INIT FUNCTIONS

    //START STATE VARIABLES
    const [messageForumButton, setMessageForumButton] = useState(initMessageForumButton);
    const [replyForumButton, setReplyForumButton] = useState(initReplyForumButton);
    const [visible, setVisible] = useState(initVisible);
    //END STATE VARIABLES

    //START EFFECTS SECTION
    const messageForumButtonEffect = useCallback(() => {
        console.log("messageForumButtonEffect");
        if(eventType) {
            console.log("eventType: " + eventType);
            if (eventType === "registeredEvent" || eventType === "coordinatedEvent") {
                setMessageForumButton(
                    <Button
                        className={"registerButton me-2 mt-3 btn-sm"}
                        key={"messageForumButton" + event.eventId}
                        id="registerFormSubmit"
                        variant="primary"
                        onClick={messageEventParent}
                        type="submit"
                    >
                        Add Message
                    </Button>
                );
            } else {
                console.log("Setting null");
                setMessageForumButton(null);
            }
        } else {
            console.log("Setting null");
            setMessageForumButton(null);
        }


    }, [eventType,
        event.eventId,
        messageEventParent]);

    const replyForumButtonEffect = useCallback(() => {
        console.log("replyForumButtonEffect");
        if(eventType) {
            console.log("eventType: " + eventType);
            if (eventType === "registeredEvent" || eventType === "coordinatedEvent") {
                setReplyForumButton(
                    <Button
                        className={"registerButton me-2 mt-3 btn-sm"}
                        key={"messageForumButton" + event.eventId}
                        id="registerFormSubmit"
                        variant="primary"
                        onClick={messageMessageParent}
                        type="submit"
                    >
                        Reply
                    </Button>
                );
            } else {

            }
        } else {
            console.log("Returning null.");
            setReplyForumButton(null);
        }

    }, [eventType,
        event.eventId,
        messageMessageParent]);

    // const setVisibleEffect = useCallback(() => {
    //
    // });
    //END EFFECTS SECTION

    //START EFFECT HOOKS
    useEffect(messageForumButtonEffect, [messageForumButtonEffect]);
    useEffect(replyForumButtonEffect, [replyForumButtonEffect]);
    //END EFFECT HOOKS

    //START BUTTON SET UP FUNCTIONS
    const getButton = (option) => {
        if (visible) {
            console.log("Visible: " + option);
            switch (option) {
                case "message":
                    return (messageForumButton);
                case "reply":
                    return (replyForumButton);
                default:
                    return null;
            }
        } else {
            console.log("Returning null.");
            return null;
        }
    }
    //END BUTTON SET UP FUNCTIONS

    return (
        getButton(props.option)
    );
}