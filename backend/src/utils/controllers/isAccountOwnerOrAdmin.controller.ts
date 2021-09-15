import {Status} from "../interfaces/Status";
import {Request, Response, NextFunction} from "express";
import {User} from "../interfaces/User";
import {Event} from "../interfaces/Event";
import {selectEventByEventId} from "../event/selectEventbyEventId";

export function isAccountOwnerOrAdmin(request: Request, response: Response, next: NextFunction): any {
    let status: Status = {status: 400, message: "You are not the owner of this event.", data: null};

    const sessionUser = (request : Request) : User | undefined => request.session?.user as User ?? undefined;

    const user = sessionUser(request);
    const {targetUserId} = request.params;

    if(user) {
        return (targetUserId === user.userId || user.userAdmin) ? next() : response.json(status);
    }

    return response.json(status);
}