import {connect} from "../database.utils";
import {PartialUser, User} from "../interfaces/User";
import {RowDataPacket} from "mysql2";

export async function selectPartialUserByUserId(userId: string) : Promise<PartialUser|null> {
    try {
        const mysqlConnection = await connect();
        const mysqlQuery : string = 'SELECT BIN_TO_UUID(userId) as userId, userAdmin, userAllowContact, userEmail, userFirstName, userLastName, userPhone, userProfileImage, userStartDate, userTotalHours, userZipCode  FROM user WHERE userId = UUID_TO_BIN(:userId)';
        const result: RowDataPacket[] = await mysqlConnection.execute(mysqlQuery, {userId}) as RowDataPacket[];
        const rows: PartialUser[] = result[0] as PartialUser[];
        return rows.length !== 0 ? {...rows[0]} : null;
    } catch (e) {
        throw e;
    }
}