
import {connect} from '../database.utils';
import {Author} from '../interfaces/Author';

export async function insertAuthor (author: Author): Promise<string>  {
    try{
        const mysqlConnection = await connect()
        const query : string = 'INSERT INTO author (authorId, authorActivationToken, authorAvatarUrl, authorEmail, authorHash, authorUsername) VALUES (UUID_TO_BIN(UUID()), :authorActivationToken, :authorAvatarUrl, :authorEmail, :authorHash, :authorUsername)'

        const [rows] = await mysqlConnection.execute(query, author)
        return 'Author Created'
    }catch(e) {
        throw e.message
    }
}