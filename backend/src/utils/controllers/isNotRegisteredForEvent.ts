import {Request, Response, NextFunction} from "express";
import {Status} from "../interfaces/Status";
import {User} from "../interfaces/User";
import {selectEventByEventId} from "../event/selectEventbyEventId";
import {Event} from "../interfaces/Event";
import {selectVolunteerByUserIdEventId} from "../volunteer/selectVolunteerByUserIdEventId";

//Prevents duplicate entries
export async function isNotRegisteredForEvent(request: Request, response: Response, next: NextFunction): Promise<any> {
    let status: Status = {status: 400, message: "You are already registered for this event.", data: null};

    const sessionUser = (request : Request) : User | undefined => request.session?.user as User ?? undefined;
    const {volunteerEventId} = request.params;

    const user = sessionUser(request);

    if(user !== null && user !== undefined) {
        const targetVolunteer = await selectVolunteerByUserIdEventId(<string>user.userId, volunteerEventId);
        return targetVolunteer ? response.json(status) : next();
    }

    status.message = "User null or undefined while checking for duplicate entry."
    return response.json(status);
}