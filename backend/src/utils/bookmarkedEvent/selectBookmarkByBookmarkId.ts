import {Event} from "../interfaces/Event";
import {User} from "../interfaces/User";
import {connect} from "../database.utils";
import {BookmarkedEvent} from "../interfaces/BookmarkedEvent"
import {RowDataPacket} from 'mysql2';

export async function selectBookmarkByBookmarkId(bookmarkedEvent: BookmarkedEvent): Promise<BookmarkedEvent|null> {
    try {
        const mysqlConnection = await connect();
        const mySqlSelectQuery = 'SELECT BIN_TO_UUID(bookmarkedEventUserId) as bookmarkedEventUserId, BIN_TO_UUID(bookmarkedEventEventId) as bookmarkedEventEventId FROM `bookmarkedEvent` WHERE bookmarkedEventUserId = UUID_TO_BIN(:bookmarkedEventUserId) AND bookmarkedEventEventId = UUID_TO_BIN(:bookmarkedEventEventId)'
        const result : RowDataPacket[]= await mysqlConnection.execute(mySqlSelectQuery, bookmarkedEvent) as RowDataPacket[]
        const rows: BookmarkedEvent[] = result[0] as BookmarkedEvent[]
        return rows.length !== 0 ? {...rows[0]} : null;
    } catch(error) {
        throw error
    }
}