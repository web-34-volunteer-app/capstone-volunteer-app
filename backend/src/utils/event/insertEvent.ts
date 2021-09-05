import {connect} from '../database.utils';
import {Event} from "../interfaces/Event";

export async function insertEvent(event: Event){
    try {
        const mySQLConnection  = await connect()
        const mysqlQuery = "INSERT INTO event(eventId, eventUserId, eventDate, eventDescription, eventDescriptionSkillsRequired, eventDescriptionTransportation, eventDescriptionTypeOfWork, eventEndTime, eventFlag, eventLatitude, eventLongitude, eventOrganization, eventStartTime) VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN(:eventUserId), NOW(),:eventDescription, :eventDescriptionSkillsRequired, :eventDescriptionTransportation, :eventDescriptionTypeOfWork, :eventEndTime, :eventFlag, :eventLatitude, :eventLongitude, :eventOrganization, :eventStartTime)";

        const [rows] = await mySQLConnection.execute(mysqlQuery, event)
        return "Event created successfully"
    }catch (error){
        console.log(error)
    }
}