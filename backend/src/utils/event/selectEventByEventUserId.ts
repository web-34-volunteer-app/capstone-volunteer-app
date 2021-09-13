//Untested function

import {connect} from "../database.utils";
import {RowDataPacket} from "mysql2";
import {Event} from "../interfaces/Event";


export async function selectEventByEventUserId(userId: string) : Promise<Event[]> {
    try {
        const mySqlConnection =await connect();
        const mySqlQuery = "SELECT BIN_TO_UUID(eventId) AS eventId, BIN_TO_UUID (eventUserId) AS eventUserId, eventAddress, eventDate, eventDescription, eventDescriptionSkillsRequired, eventDescriptionTransportation, eventDescriptionTypeOfWork, eventEndTime, eventFlag, eventLatitude, eventLongitude, eventLongitude, eventOrganization, eventStartTime, eventTitle from event inner join volunteer on volunteer.volunteerEventId = event.eventId WHERE volunteer.volunteerUserId = UUID_TO_BIN(:userId)"

        const result=await mySqlConnection.execute(mySqlQuery, {userId}) as RowDataPacket[]
        const events: Array<Event> = result[0] as Array<Event>
        return events
    } catch (error) {
        throw error
    }
}