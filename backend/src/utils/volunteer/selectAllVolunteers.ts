import {connect} from "../database.utils";
import {RowDataPacket} from "mysql2";

export async function selectAllVolunteers() : Promise<Event[]>
{
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT BIN_TO_UUID(volunteerEventId) as volunteerEventId, BIN_TO_UUID(volunteerUserId) as volunteerUserId, volunteerHours, volunteerHoursPosterVerified, volunteerHoursVolunteerVerified FROM volunteer';
        const result: RowDataPacket[] = await mySqlConnection.execute(mySqlQuery) as RowDataPacket[];

        return result[0] as Array<Event>;
    } catch (e) {
        throw e;
    }
}