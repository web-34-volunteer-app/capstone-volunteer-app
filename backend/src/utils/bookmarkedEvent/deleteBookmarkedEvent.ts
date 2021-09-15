import {BookmarkedEvent} from "../interfaces/BookmarkedEvent";
import {connect} from "../database.utils";

export async function deleteBookmarkedEvent(bookmarkedEvent: BookmarkedEvent) {
    try {
        const mySqlConnection = await connect();
        const mySqlDelete = 'DELETE FROM `bookmarkedEvent` WHERE bookmarkedEventEventId = UUID_TO_BIN(:bookmarkedEventEventId) AND bookmarkedEventUserId = UUID_TO_BIN(:bookmarkedEventUserId)';
        const [result] = await mySqlConnection.execute(mySqlDelete, bookmarkedEvent);
        return "Bookmarked event successfully deleted";
    } catch (error) {
        console.error(error);
    }
}