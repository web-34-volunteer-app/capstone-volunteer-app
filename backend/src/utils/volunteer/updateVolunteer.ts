import {Volunteer} from "../interfaces/Volunteer";
import {connect} from "../database.utils";

export async function updateVolunteer(volunteer: Volunteer): Promise<string> {
    try {
        const mysqlConnection = await connect();
        const query : string = 'UPDATE volunteer SET volunteerEventId = :volunteerEventId, volunteerUserId = :volunteerUserId, volunteerHours = :volunteerHours, volunteerHoursPosterVerified = :volunteerHoursPosterVerified, volunteerHoursVolunteerVerified = :volunteerHoursVolunteerVerified WHERE volunteerEventId = UUID_TO_BIN(:volunteerEventId) AND volunteerUserId = UUID_TO_BIN(:volunteerUserId)';
        await mysqlConnection.execute(query, volunteer);
        return 'Volunteer successfully updated';
    } catch (e) {
        throw e;
    }

}