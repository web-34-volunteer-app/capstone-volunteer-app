import {Volunteer} from "../interfaces/Volunteer";
import {connect} from "../database.utils";

export async function deleteVolunteer(volunteer: Volunteer) {
    try {
        const mySqlConnection = await connect();
        const mySqlDelete = 'DELETE FROM `volunteer` WHERE volunteerEventId = UUID_TO_BIN(:volunteerEventId) AND volunteerUserId = UUID_TO_BIN(:volunteerUserId)'
        await mySqlConnection.execute(mySqlDelete, volunteer);
        return "Event successfully deleted";
    } catch(e) {
        throw e;
    }
}