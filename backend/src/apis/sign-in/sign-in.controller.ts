import {Request, Response, NextFunction} from "express";
import passport from "passport";
import passportLocal, {Strategy} from 'passport-local';
import {User} from "../../utils/interfaces/User";
import {v4 as uuidv4} from 'uuid'
import {generateJwt, validatePassword} from "../../utils/auth.utils";
import {selectUserByUserEmail} from "../../utils/user/selectUserByUserEmail";

export async function signInController(request: Request, response: Response, nextFunction: NextFunction) {
    try {
        const {userPassword} = request.body;

        passport.authenticate(
            'local',
            {session: false},
            async (err: any, passportUser: User) => {
                console.log(passportUser);
                const {userAllowContact, userEmail, userFirstName, userLastName, userZipCode} = passportUser;
                const signature: string = uuidv4();
                const authorization: string = generateJwt({userAllowContact, userEmail, userFirstName, userLastName, userZipCode}, signature);

                const signInFailed = (message: string) => response.json({
                    status: 400,
                    data: null,
                    message
                });

                const signInSuccessful = () => {
                    if(request.session) {
                        // @ts-ignore
                        request.session.user = passportUser;
                        // @ts-ignore
                        request.session.jwt = authorization;
                        // @ts-ignore
                        request.session.signature = signature;
                    }

                    response.header({
                        authorization
                    });

                    return response.json({status: 200, data: null, message: "sign in successful"});
                };

                const isPasswordValid : boolean = passportUser && await validatePassword(passportUser.userHash, userPassword);

                return isPasswordValid ? signInSuccessful() : signInFailed("Invalid email or password");
            })(request, response, nextFunction)
    } catch(e: any) {
        return response.json({status: 500, data: null, message: e.message})
    }
}

const LocalStrategy = passportLocal.Strategy;

export const passportStrategy: Strategy = new LocalStrategy(
    {
        usernameField: 'userEmail',
        passwordField: 'userPassword'
    },
    async (email, password, done) => {
        try {
            const user: User | undefined = await selectUserByUserEmail(email);

            return user ? done(null, user) : done(undefined, undefined, {message: 'Incorrect username or password'});
        } catch(e: any) {
            return done(e);
        }
    }
)