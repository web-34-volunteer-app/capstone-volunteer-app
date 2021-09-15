import {connect} from "../database.utils";
import {User} from "../interfaces/User";
import {RowDataPacket} from "mysql2";

export async function selectWholeUserByUserId(userId: string): Promise<User> {
    try {
        const mysqlConnection = await connect();
        const sqlQuery: string = 'SELECT BIN_TO_UUID(userId) as userId, userActivationToken, userAdmin, userAllowContact, userEmail, userFirstName, userHash, userLastName, userPhone, userProfileImage, userStartDate, userTotalHours, userZipCode FROM user WHERE userId = UUID_TO_BIN(:userId)';
        const result = await mysqlConnection.execute(sqlQuery, {userId}) as RowDataPacket[];
        const rows: User[] = result[0] as User[];

        // return rows.length !== 0 ? {...rows[0]} : null;
        return {...rows[0]};
    } catch (e) {
        throw e;
    }
}