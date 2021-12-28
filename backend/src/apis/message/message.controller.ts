import {Request, Response} from "express";
import {Status} from "../../utils/interfaces/Status";
import {User} from "../../utils/interfaces/User";

import {Message} from "../../utils/interfaces/Message";
import {selectAllMessagesForUser} from "../../utils/message/selectAllMessagesForUser";
import {insertMessage} from "../../utils/message/insertMessage";
import {selectAllMessages} from "../../utils/message/selectAllMessages";

export async function getAllMessagesController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const data = await selectAllMessages();
        const status: Status = {
            status: 200,
            message: null,
            data
        }
        return response.json(status);
    } catch (error: any) {
        return response.json({
            status: 500,
            message: "",
            data: []
        })
    }
}

export async function getAllMessagesForCurrentUserController (request: Request, response: Response): Promise<Response<Status>> {
    try {
        const user: User = request.session.user as User;
        const userId: string = <string>user.userId;
        const data = await selectAllMessagesForUser(userId);
        const status: Status = {
            status: 200,
            message: null,
            data
        }
        return response.json(status);
    } catch (error: any) {
        return response.json({
            status: 500,
            message: "",
            data: []
        })
    }
}

export async function postMessageController(request: Request, response: Response): Promise<Response<Status>> {
    try {
        const {eventId, messageId, userId} = request.params;
        const {messageBody, messageSubject} = request.body;
        const messageUserId = <string>request.session?.user?.userId;
        const data = new Date();
        const messageTimeStamp = data.getTime().toString();

        const message: Message = {
            messageId: null,
            messageUserId,
            messageParentEventId: eventId ? eventId : null,
            messageParentMessageId: messageId ? messageId : null,
            messageParentUserId: userId ? userId : null,
            messageBody,
            messageSubject,
            messageTimeStamp
        };

        console.log("message: " + JSON.stringify(message));

        const result = await insertMessage(message);

        const status: Status = {
            status: 200,
            message: result ?? 'Message created successfully',
            data: null
        }
        return response.json(status);
    } catch (error: any) {
        return response.json({
            status: 500,
            message: "Failed to create message",
            data: []
        });
    }
}