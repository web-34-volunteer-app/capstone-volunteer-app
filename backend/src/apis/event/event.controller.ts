import {Request, Response, NextFunction} from "express";
import {Event} from "../../utils/interfaces/Event";
import {Status} from "../../utils/interfaces/Status";
import {User} from "../../utils/interfaces/User";
import {insertEvent} from "../../utils/event/insertEvent";


const {validationResult} = require('express-validator');

export async function postEvent(request: Request, response: Response) {
    try {
        console.log("request.body", request.body)
        const {
            eventAddress,
            eventDate,
            eventDescription,
            eventDescriptionSkillsRequired,
            eventDescriptionTransportation,
            eventDescriptionTypeOfWork,
            eventEndTime,
            eventOrganization,
            eventStartTime
        } = request.body;

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
            status: 200,
            message: result ?? 'Event created successfully',
            data: null
        };
        return response.json(status);

    } catch (error) {
        console.log(error)
    }

}


//Incomplete attempt to add controller

export async function putEventController(request: Request, response: Response): Promise<Response> {
    try {
        const {eventId} = request.params
        const {
            eventAddress,
            eventDate,
            eventDescription,
            eventDescriptionSkillsRequired,
            eventDescriptionTransportation,
            eventDescriptionTypeOfWork,
            eventEndTime,
            eventFlag,
            eventLatitude,
            eventLongitude,
            eventOrganization,
            eventStartTime
        } = request.body

        const previousEvent = await selectEventByEventId(eventId)
        const preformUpdate = async (thisEvent: Event): Promise<Response> => {
            const newEvent: Event = {...previousEvent, ...thisEvent}
            for (let key in newEvent) {
                //@ts-ignore
                newEvent[key] = thisEvent[key] ?? previousEvent[key]
            }
            await updateEvent(newEvent)
            return response.json({status: 200, data: null, message: "Event successfully updated"})
        }

        const updateFailed = (message: string): Response => {
            return response.json({status: 400, data: null, message})
        }

        let pass = true
        return pass
            ? preformUpdate({
                eventAddress,
                eventDate,
                eventDescription,
                eventDescriptionSkillsRequired,
                eventDescriptionTransportation,
                eventDescriptionTypeOfWork,
                eventEndTime,
                eventFlag,
                eventLatitude,
                eventLongitude,
                eventOrganization,
                eventStartTime
            })
            : updateFailed("you are not allowed to preform this action")
    } catch (error) {
        return response.json({status: 400, data: null, message: error.message})
    }
}

