import {connect} from "../database.utils";

export async function selectAllBookmarkedEvents() {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT BIN_TO_UUID(bookmarkedEventEventId) as bookmarkedEventEventId FROM bookmarkedEvent WHERE bookmarkedEventUserId = :bookmarkedEventUserId';
        const [rows] = await mySqlConnection.execute(mySqlQuery);
        return rows;
    } catch (error) {
        console.error(error);
    }
}