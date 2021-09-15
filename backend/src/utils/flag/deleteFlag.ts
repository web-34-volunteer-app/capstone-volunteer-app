import {Flag} from "../interfaces/Flag";
import {connect} from "../database.utils";

export async function deleteFlag(flag: Flag) {
    try {
        const mySqlConnection = await connect();
        const mySqlDelete = 'DELETE FROM flag WHERE flagEventId = UUID_TO_BIN(:flagEventId) AND flagUserId = UUID_TO_BIN(:flagUserId)';
        const [rows] = await mySqlConnection.execute(mySqlDelete, flag);
        return "Like successfully deleted";
    } catch (error) {
        console.error(error);
    }
}