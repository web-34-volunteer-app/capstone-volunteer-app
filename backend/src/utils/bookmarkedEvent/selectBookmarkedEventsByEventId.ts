import {connect} from "../database.utils";

export async function selectAllBookmarkedEvents() {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT BIN_TO_UUID(bookmarkedUserEventId) as bookmarkedUserEventId FROM bookmarkedEvent WHERE bookmarkedEventEventId = :bookmarkedEventEventId';
        const [rows] = await mySqlConnection.execute(mySqlQuery);
        return rows;
    } catch (error) {
        console.error(error);
    }
}