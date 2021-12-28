export interface Message {
    messageId: string|null,
    messageUserId: string,
    // messageParentId: string,
    messageParentEventId: string|null,
    messageParentMessageId: string|null,
    messageParentUserId: string|null,
    messageBody: string,
    messageSubject: string|null,
    messageTimeStamp: string
}