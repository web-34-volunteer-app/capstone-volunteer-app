import {connect} from "../database.utils";
import {RowDataPacket} from "mysql2";
import {Volunteer} from "../interfaces/Volunteer";

export async function selectVolunteerByEventId(volunteerEventId: string) : Promise<Volunteer|null>
{
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT BIN_TO_UUID(volunteerEventId) as volunteerEventId, BIN_TO_UUID(volunteerUserId) as volunteerUserId, volunteerHours, volunteerHoursPosterVerified, volunteerHoursVolunteerVerified FROM volunteer WHERE volunteerEventId = UUID_TO_BIN(:volunteerEventId)';
        const result: RowDataPacket[] = await mySqlConnection.execute(mySqlQuery, {volunteerEventId}) as RowDataPacket[];
        const registeredVolunteers : Array<Volunteer> = result[0] as Array<Volunteer>
        return registeredVolunteers.length === 1 ? {...registeredVolunteers[0]} : null;
    } catch (e) {
        throw e;
    }
}