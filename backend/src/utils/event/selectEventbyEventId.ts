import {connect} from "../database.utils";
import {Event} from "../interfaces/Event";
import {RowDataPacket} from "mysql2";

export async function selectEventByEventId(eventId: string) : Promise<Event|null> {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = "SELECT BIN_TO_UUID(eventId) AS eventId, BIN_TO_UUID (eventUserId) AS eventUserId, eventAddress, eventDate, eventDescription, eventDescriptionSkillsRequired, eventDescriptionTransportation, eventDescriptionTypeOfWork, eventEndTime, eventFlag, eventLatitude, eventLongitude, eventLongitude, eventOrganization, eventStartTime, eventTitle from event WHERE eventId = UUID_TO_BIN(:eventId)"
        const result = await mySqlConnection.execute(mySqlQuery, {eventId}) as RowDataPacket[]
        const events : Array<Event> = result[0] as Array<Event>
        return events.length === 1 ? {...events[0]} : null;
    } catch (error) {
        throw error
    }
}