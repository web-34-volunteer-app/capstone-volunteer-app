import {Request, Response} from "express";
import {PartialUser, User} from "../../utils/interfaces/User";
import {selectPartialUserByUserId} from "../../utils/user/selectPartialUserByUserId";
import {Status} from "../../utils/interfaces/Status";
import {selectWholeUserByUserId} from "../../utils/user/selectWholeUserByUserId";
import {updateUser} from "../../utils/user/updateUser";

export async function putUserController(request: Request, response: Response) : Promise<Response>{
    try {
        const {userId} = request.params
        //Anything that can be edited
        const {userEmail,userProfileImage} = request.body
        // @ts-ignore
        const userIdFromSession: string = <string>request.session?.user.userId

        const preFormUpdate = async (partialUser: PartialUser) : Promise<Response> => {
            const previousUser: User = await selectWholeUserByUserId(<string>partialUser.userId)
            const newUser: User = {...previousUser, ...partialUser}
            await updateUser(newUser)
            return response.json({status: 200, data: null, message: "User successfully updated"})
        }

        const updateFailed = (message: string) : Response => {
            return response.json({status: 400, data: null, message})
        }

        return userId === userIdFromSession
            //Anything that can be edited
            ? preFormUpdate({userId, userEmail})
            : updateFailed("you are not allowed to perform this action")
    } catch (error) {
        return response.json( {status:400, data: null, message: error.message})
    }
}


export async function getUserByUserId(request: Request, response: Response) : Promise<Response> {
    try {
        const {userId} = request.params;
        const mySqlResult = await selectPartialUserByUserId(userId);
        const data = mySqlResult ?? null
        const status: Status = {status: 200, data, message: null}
        return response.json(status)

    } catch (error) {
        return(response.json({status: 400, data: null, message: error.message}))

    }

}