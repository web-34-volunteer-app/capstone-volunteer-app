import {connect} from "../database.utils";

export async function selectAllUsers() {
    try {
        const mySqlConnection = await connect();
        const mySqlQuery = 'SELECT * FROM user';
        const [rows] = await mySqlConnection.execute(mySqlQuery);
        return rows;
    } catch (error) {
        console.error(error);
    }
}