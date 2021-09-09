import {connect} from "../database.utils";
import {RowDataPacket} from "mysql2";
import {Volunteer} from "../interfaces/Volunteer";

export async function selectVolunteerByUserIdEventId(volunteerUserId: string, volunteerEventId: string) : Promise<Volunteer|null>
{
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT BIN_TO_UUID(volunteerEventId) as volunteerEventId, BIN_TO_UUID(volunteerUserId) as volunteerUserId, volunteerHours, volunteerHoursPosterVerified, volunteerHoursVolunteerVerified FROM volunteer WHERE volunteerUserId = UUID_TO_BIN(:volunteerUserId) AND volunteerEventId = UUID_TO_BIN(:volunteerEventId)';
        const result: RowDataPacket[] = await mySqlConnection.execute(mySqlQuery, {volunteerUserId, volunteerEventId}) as RowDataPacket[];
        const registeredEvents : Array<Volunteer> = result[0] as Array<Volunteer>
        return registeredEvents.length === 1 ? {...registeredEvents[0]} : null;
    } catch (e) {
        throw e;
    }
}