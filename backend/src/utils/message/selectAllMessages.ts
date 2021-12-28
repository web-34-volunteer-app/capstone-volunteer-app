import {Message} from "../interfaces/Message";
import {connect} from "../database.utils";
import {RowDataPacket} from "mysql2";

export async function selectAllMessages()
    : Promise<Message[]> {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT BIN_TO_UUID(messageId) as messageId, BIN_TO_UUID(messageUserId) as messageUserId, BIN_TO_UUID(messageParentEventId) as messageParentEventId, BIN_TO_UUID(messageParentMessageId) as messageParentMessageId, BIN_TO_UUID(messageParentUserId) as messageParentUserId, messageBody, messageSubject, messageTimeStamp FROM message ORDER BY messageTimeStamp';
        const result: RowDataPacket[] = await mySqlConnection.execute(mySqlQuery) as RowDataPacket[];

        return result[0] as Array<Message>;
    } catch (error) {
        throw error;
    }
}