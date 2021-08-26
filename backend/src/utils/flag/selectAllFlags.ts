import {connect} from "../database.utils";

export async function selectAllFlags() {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT BIN_TO_UUID(flagEventId) AS flagEventId, BIN_TO_UUID(flagUserId) AS flagUserId, flagMessage'
    } catch (error) {
        console.error(error);
    }
}