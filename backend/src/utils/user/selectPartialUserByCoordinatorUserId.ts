import {connect} from "../database.utils";
import {PartialUser} from "../interfaces/User";
import {RowDataPacket} from "mysql2";

export async function selectPartialUserByCoordinatorUserId(coordinatorUserId: string) : Promise<PartialUser[]|null> {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery : string = 'SELECT BIN_TO_UUID(userId) as userId, userAdmin, userAllowContact, userEmail, userFirstName, userLastName, userPhone, userProfileImage, userStartDate, userTotalHours, userZipCode FROM user INNER JOIN volunteer ON volunteer.volunteerUserId = user.userId INNER JOIN event ON event.eventId = volunteer.volunteerEventId WHERE event.eventUserId = UUID_TO_BIN(:coordinatorUserId)';

        const result = await mySqlConnection.execute(mySqlQuery, {coordinatorUserId}) as RowDataPacket[];
        const users: Array<PartialUser> = result[0] as Array<PartialUser>;
        return users;
    } catch (error) {
        throw error;
    }
}