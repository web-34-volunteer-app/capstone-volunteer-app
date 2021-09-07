import {Request, Response, NextFunction} from "express";
import {Event} from "../../utils/interfaces/Event";
import {Status} from "../../utils/interfaces/Status";
import {User} from "../../utils/interfaces/User";
import {insertEvent} from "../../utils/event/insertEvent";



const {validationResult} = require('express-validator');

export async function postEvent(request:Request, response:Response){
    try {
        console.log("request.body",request.body)
        const {eventAddress, eventDate, eventDescription, eventDescriptionSkillsRequired,eventDescriptionTransportation, eventDescriptionTypeOfWork, eventEndTime, eventOrganization,eventStartTime} = request.body;

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