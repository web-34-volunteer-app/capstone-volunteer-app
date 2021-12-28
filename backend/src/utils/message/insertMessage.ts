import {connect} from '../database.utils';
import {Message} from "../interfaces/Message";

export async function insertMessage(message: Message) {
    try {
        const mySQLConnection = await connect();

        const mysqlQuery = 'INSERT INTO message(messageId, messageUserId, messageParentEventId, messageParentMessageId, messageParentUserId, messageBody, messageSubject, messageTimeStamp) VALUES (UUID_TO_BIN(UUID()), UUID_TO_BIN(:messageUserId), UUID_TO_BIN(:messageParentEventId), UUID_TO_BIN(:messageParentMessageId), UUID_TO_BIN(:messageParentUserId), :messageBody, :messageSubject, :messageTimeStamp)';

        await mySQLConnection.execute(mysqlQuery, message);

        return "Message created successfully"
    } catch (error) {
        throw error;
    }
}