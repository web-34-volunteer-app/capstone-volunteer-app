import {NextFunction} from "express";
import passport from "passport";
import {User} from "../../utils/interfaces/User";
import {v4 as uuidv4} from 'uuid'

export async function signInController(request: Request, response: Response, nextFunction: NextFunction) {
    try {
        const {userPassword} = request.body;

        passport.authenticate(
            'local',
            {session: false},
            async (err: any, passportUser: User) => {
                console.log(passportUser);
                const {userAllowContact, userEmail, userFirstName, userLastName, userZipCode, userPassword} = passportUser;
                const signature: string = uuidv4();
            }
        )
    } catch(e: any) {

    }
}