import {connect} from "../database.utils";
import {RowDataPacket} from "mysql2";
import {Event} from "../interfaces/Event";

export async function selectBookmarkedEventsByUserId(userId: string) : Promise<Event[]> {
    try {
        console.log('This is the user Id',userId)
        const mySqlConnection = await connect();
        const mySqlQuery = "SELECT BIN_TO_UUID(eventId) AS eventId, BIN_TO_UUID (eventUserId) AS eventUserId, eventAddress, eventDate, eventDescription, eventDescriptionSkillsRequired, eventDescriptionTransportation, eventDescriptionTypeOfWork, eventEndTime, eventFlag, eventLatitude, eventLongitude, eventOrganization, eventStartTime, eventTitle from event inner join bookmarkedEvent on bookmarkedEvent.bookmarkedEventEventId = event.eventId WHERE bookmarkedEvent.bookmarkedEventUserId = UUID_TO_BIN(:userId)"

        const result = await mySqlConnection.execute(mySqlQuery, {userId}) as RowDataPacket[]
        const events: Array<Event> = result[0] as Array<Event>
        return events;
    } catch (error) {
       throw error
    }
}