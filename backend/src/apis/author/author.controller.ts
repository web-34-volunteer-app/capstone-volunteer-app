
import {Request, Response} from 'express';
import {Status} from '../../utils/interfaces/Status';
import {insertAuthor} from '../../utils/author/insertAuthor';
import {Author} from '../../utils/interfaces/Author';

export async function postAuthorController(request: Request, response: Response): Promise<Response> {
    try {

        // authorId: null,
        // 	authorActivationToken: 'na'.repeat(16),
        // 	authorAvatarUrl: 'some url',
        // 	authorEmail: 'my@email.com',
        // 	authorHash: 'a'.repeat(97),
        // 	authorUsername: 'some name'
        console.log(request.body)
        const {authorActivationToken, authorAvatarUrl, authorEmail, authorHash, authorUsername} = request.body

        const author: Author = {authorId: null, authorActivationToken, authorAvatarUrl, authorEmail, authorHash, authorUsername }
        const message = await insertAuthor(author
        )
        return response.json({status: 200, message, data: 0})
    } catch (error){
        console.error(error)
        return response.json({status:500, data:null, message: error})
    }

}