import {connect} from "../database.utils";
import {BookmarkedEvent} from "../interfaces/BookmarkedEvent";

export async function selectBookmarkedEventsByUserId(bookmarkedEventUserId: string) : Promise<Array<BookmarkedEvent|null>> {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT BIN_TO_UUID(bookmarkedEventEventId) as bookmarkedEventEventId FROM bookmarkedEvent WHERE bookmarkedEventUserId = :bookmarkedEventUserId';
        const [rows] = await mySqlConnection.execute(mySqlQuery);
        return rows;
    } catch (error) {
        console.error(error);
    }
}