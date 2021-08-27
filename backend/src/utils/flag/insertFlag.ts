import {Flag} from "../interfaces/Flag";
import {connect} from "../database.utils";

export async function insertFlag(flag: Flag) {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'INSERT INTO flag(flagEventId, flagUserId, flagMessage) VALUES(UUID_TO_BIN(:flagEventId), UUID_TO_BIN(:flagUserId), :flagMessage)';
        const [rows] = await mySqlConnection.execute(mySqlQuery, flag);
        return "Flag successfully inserted";
    } catch(error) {
        console.error(error);
    }
}