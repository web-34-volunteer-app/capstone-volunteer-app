import {NextFunction, Request, Response} from 'express';
import {JsonWebTokenError, TokenExpiredError, verify, } from "jsonwebtoken";
import {Status} from "../interfaces/Status";
import {User} from "../interfaces/User";

export function isLoggedIn(request: Request, response: Response, next: NextFunction): any {

    let status : Status = {status: 400, message: "Please login", data: null};

    const sessionUser  = (request : Request): User | undefined => request.session?.user ?? undefined;
    console.log(request.sessionID)

    const signature = (request : Request) : string => request.session?.signature ?? "no signature"

    const isSessionActive = (isUserActive: User| undefined) : boolean => isUserActive ? true : false;

    const getJwtTokenFromHeader  = (headers: any): string => {
        return headers["authorization"];
    };
    const unverifiedJwtToken: string = getJwtTokenFromHeader(request.headers);

    const isJwtValid: any = unverifiedJwtToken
        ? verify(
            unverifiedJwtToken,
            signature(request),
            {maxAge: "3hr"},
            (error: any, decoded: any) => error ? false : true
        )
        : false;

    return isJwtValid && isSessionActive(sessionUser(request)) ? next() : response.json(status);

}


