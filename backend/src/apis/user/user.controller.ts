import {Request, Response} from "express";
import {PartialUser, User} from "../../utils/interfaces/User";

//import {selectPartialUserByUserId} from "../../utils/user/selectPartialUserByUserId";
//import {Status} from "../../utils/interfaces/Status";
import {selectAllUsers} from "../../utils/user/getAllUsers";
import {insertUser} from "../../utils/user/insertUser";
import {selectPartialUserByUserId} from "../../utils/user/selectPartialUserByUserId";
import {Status} from "../../utils/interfaces/Status";
import {selectWholeUserByUserId} from "../../utils/user/selectWholeUserByUserId";
import {updateUser} from "../../utils/user/updateUser";
//import {selectWholeUserByUserId} from "../../utils/user/selectWholeUserByUserId";
//import {updateUser} from "../../utils/user/updateUser";

export async function getAllUsersController(request: Request, response: Response) : Promise<Response> {
    try {
        const data = await selectAllUsers();
        return response.json({status: 200, message: null, data});
    } catch (error) {
        console.error(error);
        // @ts-ignore
        return response.json({status: 200, message: error.message, data: null})
    }
}

export async function getUserByUserIdController(request: Request, response: Response) : Promise<Response> {
    console.log("Trying to get user by userId");
    try {
        const {userId} = request.params;
        const mySqlResult = await selectPartialUserByUserId(userId);
        const data = mySqlResult ?? null
        const status: Status = {status: 200, data, message: null}
        return response.json(status)

    } catch (error: any) {
        return(response.json({status: 400, data: null, message: error.message}))
    }
}

export async function putUserController(request: Request, response: Response) : Promise<Response>{
    try {
        const {userId} = request.params
        //Anything that can be viewed/edited
        const {userAdmin, userAllowContact, userEmail, userFirstName, userLastName, userPhone, userProfileImage, userStartDate, userTotalHours, userZipCode} = request.body

        const userIdFromSession: string = <string>request.session?.user?.userId

        console.log("userId: ", userId);
        console.log("userIdFromSession: ", userIdFromSession);
        const preFormUpdate = async (partialUser: PartialUser) : Promise<Response> => {
            const previousUser: User = await selectWholeUserByUserId(<string>partialUser.userId)
            const newUser: User|null = {...previousUser, ...partialUser}

            for(let key in newUser) {
                //@ts-ignore
                newUser[key] = partialUser[key] ?? previousUser[key];
            }
            await updateUser(newUser)
            return response.json({status: 200, data: null, message: "User successfully updated"})
        }
        console.log("After preFormUpdate");
        const updateFailed = (message: string) : Response => {
            return response.json({status: 400, data: null, message})
        }

        return userId === userIdFromSession
            //Anything that can be viewed/edited
            ? preFormUpdate({userId, userAdmin, userAllowContact, userEmail, userFirstName, userLastName, userPhone, userProfileImage, userStartDate, userTotalHours, userZipCode})
            : updateFailed("you are not allowed to pre-form this action")
    } catch (error : any) {
        return response.json( {status:400, data: null, message: error.message})
    }
}










