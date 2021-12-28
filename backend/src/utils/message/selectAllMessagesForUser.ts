import {Message} from "../interfaces/Message"
import {connect} from "../database.utils"
import {RowDataPacket} from "mysql2"

export async function selectAllMessagesForUser(userId: string) : Promise<Message[]>
{
    try {
        const mySqlConnection = await connect();
        const mySqlQuery =
            'WITH RECURSIVE MessageTree (messageId, MessageUserId, MessageParentEventId, messageParentMessageId, messageParentUserId, messageBody, messageSubject, messageTimeStamp) AS (SELECT BIN_TO_UUID(messageId) as messageId, BIN_TO_UUID(messageUserId) as messageUserId, BIN_TO_UUID(messageParentEventId) as messageParentEventId, BIN_TO_UUID(messageParentMessageId) as messageParentMessageId, BIN_TO_UUID(messageParentUserId) as messageParentUserId, messageBody, messageSubject, messageTimeStamp FROM message INNER JOIN volunteer ON volunteer.volunteerEventId = message.messageParentEventId INNER JOIN event ON event.eventId = message.messageParentEventId INNER JOIN user ON user.userId = message.messageParentUserId WHERE volunteer.volunteerUserId = UUID_TO_BIN(:userId) OR event.eventUserId = UUID_TO_BIN(:userId) OR user.userId = UUID_TO_BIN(:userId) UNION ALL SELECT BIN_TO_UUID(m.messageId) as messageId, BIN_TO_UUID(m.messageUserId) as messageUserId, BIN_TO_UUID(m.messageParentEventId) as messageParentEventId, BIN_TO_UUID(m.messageParentMessageId) as messageParentMessageId, BIN_TO_UUID(m.messageParentUserId) as messageParentUserId, m.messageBody, m.messageSubject, m.messageTimeStamp FROM MessageTree mt JOIN message m ON (mt.messageParentMessageId = m.messageId)) SELECT * FROM MessageTree';

        const result = await mySqlConnection.execute(mySqlQuery, {userId}) as RowDataPacket[];
        const eventMessages: Array<Message> = result[0] as Array<Message>;
        return eventMessages;
    } catch (error) {
        throw error;
    }
}