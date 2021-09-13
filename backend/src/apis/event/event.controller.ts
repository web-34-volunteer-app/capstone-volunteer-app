import {Request, Response, NextFunction} from "express";
import {Event} from "../../utils/interfaces/Event";
import {Status} from "../../utils/interfaces/Status";
import {insertEvent} from "../../utils/event/insertEvent";
import {selectAllEvents} from "../../utils/event/selectAllEvents";
import {deleteEvent} from "../../utils/event/deleteEvent";
import {selectEventByEventId} from "../../utils/event/selectEventbyEventId";
import {selectEventByEventOrganization} from "../../utils/event/selectEventByEventOrganization";
import {updateEvent} from "../../utils/event/updateEvent";
import {selectEventByEventUserId} from "../../utils/event/selectEventByEventUserId";
import {User} from "../../utils/interfaces/User";

// const {validationResult} = require('express-validator');
export async function getAllEventsController(request: Request, response: Response): Promise<Response<Status>> {

    try {
        const data = await selectAllEvents()
        //return the response
        const status: Status = {status: 200, message: null, data};
        return response.json(status);
    } catch(error){
            return response.json({
                status:500,
                message:"",
                data:[]
            })
        }
    }
    export async function getEventbyEventIdController(request: Request, response: Response): Promise<Response<Status>> {

        try {
            const {eventId} = request.params
            const data = await selectEventByEventId(eventId) as Event
            //return the response
            const status: Status = {status: 200, message: null, data};
            return response.json(status);
        } catch(error){
            return response.json({
                status:500,
                message:"",
                data:[]
            })
        }
    }
export async function getEventByEventOrganizationController(request: Request, response: Response): Promise<Response<Status>> {

    try {
        const {eventOrganization} = request.params

        const data = await selectEventByEventOrganization(eventOrganization) as Event
        //return the response
        const status: Status = {status: 200, message: null, data};
        return response.json(status);
    } catch(error){
        return response.json({
            status:500,
            message:"",
            data:[]
        })
    }
}

export async function getEventByEventUserIdController(request: Request, response: Response): Promise<Response<Status>> {
    console.log('an event controller')
    try {
        console.log('trying in controller')
        const user : User = request.session.user as User
        const userId : string = <string>user.userId
        const data = await selectEventByEventUserId(userId) as Event[]
        //return the response
        const status: Status = {status: 200, message: null, data};
        return response.json(status);
    } catch(error){
        console.log("error in controller")
        return response.json({
            status:500,
            message:"",
            data:[]
        })
    }
}


export async function deleteEventByIdController(request: Request, response: Response): Promise <Response<string>>{
    try {
        const {eventId} = request.params;
        const result = await selectEventByEventId(eventId) as Event

        //Delete all volunteers on this event
        //Delete all bookmarks from this event
        //Possibly delete all flags for this event

            await deleteEvent(result);

        const status: Status = {
            status:200,
            message: 'Event successfully deleted',
            data:null
        };
        return response.json(status);

    }catch(error:any) {
        return(response.json({status: 500, data: null, message: error.message}))
    }
}


export async function postEvent(request:Request, response : Response){
    try {
        const {eventAddress, eventDate, eventDescription, eventDescriptionSkillsRequired,eventDescriptionTransportation,
            eventDescriptionTypeOfWork, eventEndTime, eventOrganization,eventStartTime, eventTitle} = request.body;

        const eventUserId = <string>request.session?.user?.userId

        const eventLatitude = "36.793230";
        const eventLongitude = "-76.111660";

        const event: Event = {
            eventId: null,
            eventUserId,
            eventAddress,
            eventDate,
            eventDescription,
            eventDescriptionSkillsRequired,
            eventDescriptionTransportation,
            eventDescriptionTypeOfWork,
            eventEndTime,
            eventFlag: false,
            eventLatitude,
            eventLongitude,
            eventOrganization,
            eventStartTime,
            eventTitle
        };
        console.log("event:", event)
        const result = await insertEvent(event)
        const status: Status = {
            status:200,
            message: result ?? 'Event created successfully',
            data:null
        };
        return response.json(status);

    }catch (error){
        console.log(error)
    }
}

export async function putEventController(request: Request, response: Response) : Promise<Response>{
    try {
        const {eventId} = request.params
        //Anything that can be viewed/edited
        const {eventUserId, eventAddress, eventDate, eventDescription, eventDescriptionSkillsRequired, eventDescriptionTransportation, eventDescriptionTypeOfWork, eventEndTime, eventFlag, eventLatitude, eventLongitude, eventOrganization, eventStartTime, eventTitle} = request.body

        //const userIdFromSession: string = <string>request.session?.user?.userId

        //console.log("userId: ", userId);
        //console.log("userIdFromSession: ", userIdFromSession);
        const preFormUpdate = async (thisEvent: Event) : Promise<Response> => {
            const previousEvent: Event|null = await selectEventByEventId(<string>eventId)
            const newEvent: Event|null = {...previousEvent, ...thisEvent}

            for(let key in newEvent) {
                //@ts-ignore
                newEvent[key] = thisEvent[key] ?? previousEvent[key];
            }
            await updateEvent(newEvent)
            return response.json({status: 200, data: null, message: "Event successfully updated"})
        }
        //console.log("After preFormUpdate");
        const updateFailed = (message: string) : Response => {
            return response.json({status: 400, data: null, message})
        }
        let pass = true;
        return pass
            //Anything that can be viewed/edited
            ? preFormUpdate({eventId, eventUserId, eventAddress, eventDate, eventDescription, eventDescriptionSkillsRequired, eventDescriptionTransportation, eventDescriptionTypeOfWork, eventEndTime, eventFlag, eventLatitude, eventLongitude, eventOrganization, eventStartTime, eventTitle})
            : updateFailed("you are not allowed to pre-form this action");
    } catch (error : any) {
        return response.json( {status:400, data: null, message: error.message})
    }
}
