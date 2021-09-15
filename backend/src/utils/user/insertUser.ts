import {connect} from "../database.utils"
import {User} from "../interfaces/User"

export async function insertUser(user: User) {

    //console.log("user", user);
    try {
        const mySqlConnection = await connect();
        const query : string = 'INSERT INTO user(userId, userActivationToken, userAdmin, userAllowContact, userEmail, userFirstName, userHash, userLastName, userPhone, userProfileImage, userStartDate, userTotalHours, userZipCode) VALUES (UUID_TO_BIN(UUID()), :userActivationToken , :userAdmin, :userAllowContact, :userEmail, :userFirstName, :userHash, :userLastName, :userPhone, :userProfileImage, :userStartDate, :userTotalHours, :userZipCode)';

        const [rows] = await mySqlConnection.execute(query, user);

        return "User successfully created"
    }
    catch (e: any) {
        console.error(e)
        return null
    }
}