import {Status} from "../interfaces/Status";
import {Request, Response, NextFunction} from "express";
import {User} from "../interfaces/User";
import {Event} from "../interfaces/Event";
import {selectEventByEventId} from "../event/selectEventbyEventId";

export async function isEventOwnerOrAdmin(request: Request, response: Response, next: NextFunction): Promise<any> {
    let status: Status = {status: 400, message: "You are not the owner of this event.", data: null};

    const sessionUser = (request : Request) : User | undefined => request.session?.user as User ?? undefined;
    const {eventId} = request.params;

    const user = sessionUser(request);
    const targetEvent = await selectEventByEventId(eventId) as Event;

    if(user) {
        return (targetEvent.eventUserId === user.userId || user.userAdmin) ? next() : response.json(status);
    }

    return response.json(status);
}