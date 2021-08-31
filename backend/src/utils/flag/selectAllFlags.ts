import {connect} from "../database.utils";

export async function selectAllFlags() {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT * FROM flag';
        const [rows] = await mySqlConnection.execute(mySqlQuery);
        return rows;
    } catch (error) {
        console.error(error);
    }
}