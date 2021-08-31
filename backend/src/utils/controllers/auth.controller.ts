import passport from 'passport';
import passportLocal, { Strategy } from 'passport-local';

import {User} from "../interfaces/User";
import {selectUserByUserEmail} from "../user/selectUserByUserEmail";

const LocalStrategy = passportLocal.Strategy;

const passportStrategy : Strategy = new LocalStrategy(
    {
        usernameField: 'userEmail',
        passwordField: "userPassword"
    },
    async (email, password, done) => {
        try {

            const profile : User | undefined = await selectUserByUserEmail(email);
            return profile ? done(null, profile) : done(undefined, undefined, { message: 'Incorrect username or password'});
        }
        catch (error) {
            return done(error);
        }
    });
export const  passportMiddleware = passport.use(passportStrategy);

