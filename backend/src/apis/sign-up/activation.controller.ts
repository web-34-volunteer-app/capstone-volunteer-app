import {NextFunction, Request, Response} from "express";
import {selectUserByUserActivationToken} from "../../utils/user/selectUserByUserActivationToken";
import {User} from "../../utils/interfaces/User";
import {updateUser} from "../../utils/user/updateUser";


export async function activationController(request: Request, response: Response, nextFunction: NextFunction) {
    const {activation} = request.params
    try {

        const user = await selectUserByUserActivationToken(activation)

        const activationFailed = () => response.json({
            status: 400,
            data: null,
            message: "Account activation has failed. Have you already activated this account"
        });

        const activationSucceeded = async (user: User) => {
            const updatedUser = {...user, userActivationToken: null}
            await updateUser(updatedUser)
            return response.json({
                status: 200,
                data: null,
                message: "Account activation was successful"
            });
        }

        user ? await activationSucceeded(user) : activationFailed()

    } catch (error: any) {
        return response.json({status: 500, data: null, message: error.message})
    }
}