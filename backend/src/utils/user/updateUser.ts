import {User} from "../interfaces/User";
import {connect} from "../database.utils";

export async function updateUser(user: User) {
    try {

        const mysqlConnection = await connect();
        const query : string = 'UPDATE user SET userActivationToken = :userActivationToken,  userProfileImage = :userProfileImage,userEmail = :userEmail, userHash = :userHash WHERE userId = UUID_TO_BIN(:userId)';

        const [rows] = await mysqlConnection.execute(query, user);
        return 'User successfully updated'
    } catch (e) {
        console.error(e)
        return null
    }
}