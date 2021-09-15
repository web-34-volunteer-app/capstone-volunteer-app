import {connect} from "../database.utils";
import {RowDataPacket} from "mysql2";
import {User} from "../interfaces/User";

export async function selectAllUsers() : Promise<User[]> {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT BIN_TO_UUID(userId) AS userID, userActivationToken, userAdmin, userAllowContact, userEmail, userFirstName, userHash, userLastName, userPhone, userProfileImage, userStartDate, userTotalHours, userZipCode FROM user';
        const result = await mySqlConnection.execute(mySqlQuery) as RowDataPacket[];
        return result[0] as Array<User>;
    } catch (error) {
        throw error;
    }
}