import {connect} from "../database.utils";
import {Flag} from "../interfaces/Flag";

export async function updateFlag(flag: Flag) {
    try {
        const mysqlConnection = await connect();
        const query : string = 'UPDATE flag SET flagMessage = :flagMessage WHERE flagEventId = UUID_TO_BIN(:flagEventId) AND flagUserId = UUID_TO_BIN(:flagUserId)';
        const [rows] = await mysqlConnection.execute(query, flag);
        return 'Flag successfully updated';
    } catch (error) {
        console.error(error);
        return null;
    }
}