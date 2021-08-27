
import {connect} from "../database.utils"
import {User} from "../interfaces/User"

export async function insertUser(user: User) {
    try {
        const mySqlConnection = await connect();
        const query : string = 'INSERT INTO user(userId, userActivationToken, userAdmin, userAllowContact, userEmail, userFirstName, userHash, userLastName, userProfileImage, userStartDate, userTotalHours, userZip) VALUES (UUID_TO_BIN(UUID()), :userActivationToken , :userAdmin, :userAllowContact, :userEmail, :userFirstName, :userHash, :userLastName, :userProfileImage, :userStartDate, :userTotalHours, :userZip)';
        const [rows]= await mySqlConnection.execute(query, user);

        return "Profile successfully created"
    }
    catch (e) {console.error(e)
        return null
    }
}