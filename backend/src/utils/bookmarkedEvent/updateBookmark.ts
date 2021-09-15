import {connect} from "../database.utils";
import {BookmarkedEvent} from "../interfaces/BookmarkedEvent";

export async function updateBookmarkedEvent(bookmarkedEvent: BookmarkedEvent) {
    try {
        const mysqlConnection = await connect();
        const query : string = 'UPDATE bookmarkedEvent SET bookmarkedEventEventId = :bookmarkedEventEventId, bookmarkedEventUserId = :bookmarkedEventUserId WHERE bookmarkedEventEventId = UUID_TO_BIN(:bookmarkedEventEventId) AND bookmarkedEventUserId = UUID_TO_BIN(:bookmarkedEventUserId)';
        const [rows] = await mysqlConnection.execute(query, bookmarkedEvent);
        return 'Bookmarked Event successfully updated';
    } catch (error) {
        console.error(error);
        return null;
    }
}