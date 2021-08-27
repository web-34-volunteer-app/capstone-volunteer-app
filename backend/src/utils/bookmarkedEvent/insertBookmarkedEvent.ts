import {BookmarkedEvent} from "../interfaces/BookmarkedEvent";
import {connect} from "../database.utils";

export async function insertBookmarkedEvent(bookmarkedEvent: BookmarkedEvent) {
    try {
        const mysqlConnection = await connect();
        const query : string = 'INSERT INTO bookmarkedEvent(bookmarkedEventEventId, bookmarkedEventUserId) VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN(UUID()))';
        const [rows] = await mysqlConnection.execute(query, bookmarkedEvent);
        return 'BookmarkedEvent Successfully Created';
    } catch (error) {
        console.error(error);
        return null;
    }
}