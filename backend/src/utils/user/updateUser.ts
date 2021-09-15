import {User} from "../interfaces/User";
import {connect} from "../database.utils";

export async function updateUser(user: User|null) {
    try {

        const mysqlConnection = await connect();
        const query : string = 'UPDATE user SET userActivationToken = :userActivationToken, userEmail = :userEmail, userAdmin = :userAdmin, userAllowContact = :userAllowContact, userEmail = :userEmail, userFirstName = :userFirstName, userHash = :userHash, userLastName = :userLastName, userPhone = :userPhone, userProfileImage = :userProfileImage, userTotalHours = :userTotalHours, userZipCode = :userZipCode WHERE userId = UUID_TO_BIN(:userId)';

        const [rows] = await mysqlConnection.execute(query, user);
        return 'User successfully updated';

    } catch (e: any) {
        throw e;
    }
}