import {connect} from "../database.utils";
import {RowDataPacket} from "mysql2";
import {Volunteer} from "../interfaces/Volunteer";

export async function selectVolunteerByUserId(volunteerUserId: string) : Promise<Array<Volunteer|null>>
{
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT BIN_TO_UUID(volunteerEventId) as volunteerEventId, BIN_TO_UUID(volunteerUserId) as volunteerUserId, volunteerHours, volunteerHoursPosterVerified, volunteerHoursVolunteerVerified FROM volunteer WHERE volunteerUserId = UUID_TO_BIN(:volunteerUserId)';
        const result: RowDataPacket[] = await mySqlConnection.execute(mySqlQuery, {volunteerUserId}) as RowDataPacket[];
        const registeredEvents : Array<Volunteer> = result[0] as Array<Volunteer>
        return registeredEvents;
    } catch (e) {
        throw e;
    }
}