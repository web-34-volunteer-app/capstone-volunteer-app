import {Request, Response, NextFunction} from "express";
import {Event} from "../../utils/interfaces/Event";
import {Status} from "../../utils/interfaces/Status";
import {User} from "../../utils/interfaces/User";
import {insertEvent} from "../../utils/event/insertEvent";


const {validationResult} = require('express-validator');

export async function postEvent(request:Request, response:Response){
    try {
        const {eventDescription, eventDescriptionSkillsRequired, eventFlag, eventOrganization,} = request.body;

        const eventUserId = <string>request.session?.user?.userId

        const event: Event = {
            eventId: null,
            eventUserId,
            eventDate: null,
            eventDescription,
            eventDescriptionSkillsRequired,
            eventDescriptionTransportation: null,
            eventDescriptionTypeOfWork: null,
            eventEndTime: null,
            eventFlag,
            eventLatitude: null,
            eventLongitude: null,
            eventOrganization,
            eventStartTime: null
        }
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