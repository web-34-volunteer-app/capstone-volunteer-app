import {Volunteer} from "../interfaces/Volunteer";
import {connect} from "../database.utils";

export async function insertVolunteer(volunteer:Volunteer) {
    try {
        const mySqlConnection = await connect();
        const query : string = 'INSERT INTO volunteer(volunteerEventId, volunteerUserId, volunteerHours, volunteerHoursPosterVerified, volunteerHoursVolunteerVerified) VALUES (UUID_TO_BIN(:volunteerEventId), UUID_TO_BIN(:volunteerUserId), :volunteerHours, :volunteerHoursPosterVerified, :volunteerHoursVolunteerVerified)';

        const [rows] = await mySqlConnection.execute(query, volunteer);

        return "Volunteer successfully created"
    } catch(e: any) {
        console.error(e);
        return null
    }
}