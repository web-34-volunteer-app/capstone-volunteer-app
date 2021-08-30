import {connect} from "../database.utils";
import {User} from "../interfaces/User";

export async function selectWholeUserByUserId(userId: string) {
    try {
        const mysqlConnection = await connect();

        const [rows] = await mysqlConnection.execute('SELECT BIN_TO_UUID(userId) as userId, userActivationToken, userProfileImage, userEmail, userHash FROM user WHERE userId = UUID_TO_BIN(:userId)', {userId});

        // @ts-ignore is required so that rows can be interacted with like the array it is
        return rows.length !== 0 ? {...rows[0]} : undefined;
    } catch (e) {
        console.error(e)
        return undefined
    }
}