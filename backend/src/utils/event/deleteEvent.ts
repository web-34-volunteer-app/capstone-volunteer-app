import {connect} from "../database.utils";
import {Event} from "../interfaces/Event";


export async function deleteEvent(event: Event){
    try {
        const mySqlConnection = await connect();
        const mySqlDelete = 'DELETE FROM `event` WHERE eventId = UUID_TO_BIN(:eventId)';
        await mySqlConnection.execute(mySqlDelete, event);
        return "Event successfully deleted";
    }catch (e){
        throw e
    }
}