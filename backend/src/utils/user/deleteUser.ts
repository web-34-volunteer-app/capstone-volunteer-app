import {connect} from "../database.utils";
import {User} from "../interfaces/User";


export async function deleteUser(user: User){
    try {
        const mySqlConnection = await connect();
        const mySqlDelete = 'DELETE FROM `user` WHERE userId = UUID_TO_BIN(:userId)';
        await mySqlConnection.execute(mySqlDelete, user);
        return "User successfully deleted";
    }catch (e){
        throw e
    }
}