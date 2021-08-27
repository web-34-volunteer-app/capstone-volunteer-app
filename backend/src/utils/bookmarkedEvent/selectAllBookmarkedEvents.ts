import {connect} from "../database.utils";

export async function selectAllBookmarkedEvents() {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT * FROM bookmarkedEvent';
        const [rows] = await mySqlConnection.execute(mySqlQuery);
        return rows;
    } catch (error) {
        console.error(error);
    }
}