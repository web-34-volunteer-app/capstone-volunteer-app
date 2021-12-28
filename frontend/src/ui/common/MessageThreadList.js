import React, {useContext} from "react";
import {StoreContext} from "../main/Home";
import {EventContext} from "./EventList";
import {Accordion} from "react-bootstrap";
import {EventForumButton} from "./EventForumButton";

export const MessageThreadList = () => {
    const {
        allUsers,
        messages
    } = useContext(StoreContext);

    const {event} = useContext(EventContext);

    const getUser = (userId) => {
        let targetUser = null;
        if(allUsers) {
            allUsers.every(user => {
                if(user.userId === userId) {
                    targetUser = user;
                    return false;
                }
                return true;
            })
        }
        return targetUser;
    }

    const getRootMessages = () => {
        let rootMessages = [];
        if(messages) {
            messages.forEach(message => {
                if(message.messageParentEventId === event.eventId) {
                    rootMessages.push(getMessageComponent(message));
                }
            });
        }
        return rootMessages;
    }

    const getChildren = (parent) => {
        let children = [];
        if(messages) {
            messages.forEach(message=> {
                if(message.messageParentMessageId === parent.messageId) {
                    children.push(getMessageComponent(message));
                }
            })
        }
        return children;
    }

    const getMessageButtons = (message) => {
        return (
            <EventForumButton
                message={message}
                option={"reply"}
            />
        )
    }

    const getMessageComponent = (message) => {
        const user = getUser(message.messageUserId);
        const userName = user.userFirstName + " " + user.userLastName;
        return (
            <Accordion.Item eventKey={message.messageId}>
                <Accordion.Header>
                    {userName}
                </Accordion.Header>
                <Accordion.Body>
                    {message.messageBody}
                    {getMessageButtons(message)}
                    {getChildren(message)}
                </Accordion.Body>
            </Accordion.Item>
        );
    }

    return(getRootMessages());
}