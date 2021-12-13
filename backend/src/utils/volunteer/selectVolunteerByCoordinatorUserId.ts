import {connect} from "../database.utils";
import {Volunteer} from "../interfaces/Volunteer";
import {RowDataPacket} from "mysql2";

export async function selectVolunteerByCoordinatorUserId(coordinatorUserId: string) : Promise<Volunteer[]|null> {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery : string = 'SELECT BIN_TO_UUID(volunteerEventId) as volunteerEventId, BIN_TO_UUID(volunteerUserId) as volunteerUserId, volunteerHours, volunteerHoursPosterVerified, volunteerHoursVolunteerVerified FROM volunteer INNER JOIN event ON event.eventId = volunteer.volunteerEventId WHERE event.eventUserId = UUID_TO_BIN(:coordinatorUserId)';

        const result = await mySqlConnection.execute(mySqlQuery, {coordinatorUserId}) as RowDataPacket[];
        const volunteers: Array<Volunteer> = result[0] as Array<Volunteer>;
        return volunteers;
    } catch (error) {
        throw error;
    }
}