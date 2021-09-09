import {BookmarkedEvent} from "../interfaces/BookmarkedEvent";
import {connect} from "../database.utils";

export async function insertBookmarkedEvent(bookmarkedEvent: BookmarkedEvent) {
    try {
        const mysqlConnection = await connect();
        const mySqlQuery : string = 'INSERT INTO `bookmarkedEvent`(bookmarkedEventEventId, bookmarkedEventUserId) VALUES (UUID_TO_BIN(:bookmarkedEventEventId), UUID_TO_BIN(:bookmarkedEventUserId))';
        const [rows] = await mysqlConnection.execute(mySqlQuery, bookmarkedEvent);
        return 'BookMarkedEvent Successfully Created';
    } catch (error) {
        console.error(error);
        return null;
    }
}