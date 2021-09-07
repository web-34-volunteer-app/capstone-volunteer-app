import { Event } from '../../utils/interfaces/Event';
import { Status } from '../../utils/interfaces/Status';
import {Request, Response} from "express";

export function signOutController(request: Request, response : Response) {
    let status : Status = {status: 200, message: "sign out successful", data: null};
    const {session}  = request;

    const executeSignOut = () => {
        // @ts-ignore: broken typing is requiring a callback function that is optional.
        //console.log("Destroying session.");
        session?.destroy();
    };

    const signOutFailed = () => {
        status.status = 400;
        status.message = "you are not signed in";
    };

    let isSession;
    if(session) {
        isSession = true;
    } else {
        isSession = false;
    }
    console.log("Session: ", isSession);

    session ? executeSignOut() : signOutFailed();

    return response.json(status)
}