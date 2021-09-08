import {Request, Response, NextFunction} from "express";
import {Event} from "../../utils/interfaces/Event";
import {Status} from "../../utils/interfaces/Status";
import {User} from "../../utils/interfaces/User";
import {insertEvent} from "../../utils/event/insertEvent";
import {selectAllEvents} from "../../utils/event/selectAllEvents";
import {deleteEvent} from "../../utils/event/deleteEvent";
import {selectEventByEventId} from "../../utils/event/selectEventbyEventId";
import {selectEventByEventOrganization} from "../../utils/event/selectEventByEventOrganization";

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


export async function deleteEventByIdController(request: Request, response: Response): Promise <Response<string>>{
    try {
        const {eventId} = request.params
        const result = await selectEventByEventId(eventId) as Event
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


export async function postEvent(request:Request, response:Response){
    try {
        console.log("request.body",request.body)
        const {eventAddress, eventDate, eventDescription, eventDescriptionSkillsRequired,eventDescriptionTransportation,
            eventDescriptionTypeOfWork, eventEndTime, eventOrganization,eventStartTime} = request.body;

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
            eventStartTime
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