import {connect} from "../database.utils";
import {Event} from "../interfaces/Event";
import {RowDataPacket} from "mysql2";

export async function selectEventByEventOrganization(eventOrganization: string) : Promise<Event|null> {

    try {
        const mySqlConnection = await connect();
        const mySqlQuery = "SELECT BIN_TO_UUID(eventId) AS eventId, BIN_TO_UUID (eventUserId) AS eventUserId, eventAddress, eventDate, eventDescription, eventDescriptionSkillsRequired, eventDescriptionTransportation, eventDescriptionTypeOfWork, eventEndTime, eventFlag, eventLatitude, eventLongitude, eventOrganization, eventStartTime from event WHERE eventOrganization = :eventOrganization"
        const result = await mySqlConnection.execute(mySqlQuery, {eventOrganization}) as RowDataPacket[]
        const events : Array<Event> = result[0] as Array<Event>
        return events.length === 1 ? {...events[0]} : null;
    } catch (error) {
        throw error
    }
}