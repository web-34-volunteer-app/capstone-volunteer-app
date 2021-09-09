import {connect} from '../database.utils';
import {Event} from "../interfaces/Event";

export async function updateEvent(event: Event): Promise<string> {
    try {
        const mysqlConnection = await connect();
        const query : string = 'UPDATE event SET eventAddress = :eventAddress, eventDate = :eventDate, eventDescription = :eventDescription, eventDescriptionSkillsRequired = :eventDescriptionSkillsRequired, eventDescriptionTransportation = :eventDescriptionTransportation, eventDescriptionTypeOfWork = :eventDescriptionTypeOfWork, eventEndTime = :eventEndTime, eventFlag = :eventFlag, eventLatitude = :eventLatitude, eventLongitude = :eventLongitude, eventOrganization = :eventOrganization, eventStartTime= :eventStartTime WHERE eventId = UUID_TO_BIN(:eventId)';
        await mysqlConnection.execute(query, event);
        return 'Event successfully updated';
    } catch (e) {
        throw e;
    }
}