import {Event} from "../interfaces/Event";
import{connect} from "../database.utils";
import {User} from "../interfaces/User";
import {Status} from "../interfaces/Status";
import {RowDataPacket} from "mysql2";

export async function selectAllEvents() : Promise<Event[]>
{
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT BIN_TO_UUID(eventId) as eventId, BIN_TO_UUID(eventUserId) as eventUserId, eventAddress, eventDate, eventDescription, eventDescriptionSkillsRequired, eventDescriptionTransportation, eventDescriptionTypeOfWork, eventEndTime, eventFlag, eventLatitude, eventLongitude, eventLongitude, eventOrganization, eventStartTime FROM event';
        const result: RowDataPacket[] = await mySqlConnection.execute(mySqlQuery) as RowDataPacket[];

        return result[0] as Array<Event>;
    } catch (error) {
        throw error;
    }
}