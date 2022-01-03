import {Request, Response} from "express";
import "express-session";
import {setActivationToken, setHash} from "../../utils/auth.utils";
import {User} from "../../utils/interfaces/User";
import {insertUser} from "../../utils/user/insertUser";
import MailComposer from "nodemailer/lib/mail-composer";
import {Status} from "../../utils/interfaces/Status";


const mailgun = require("mailgun-js")

// Interfaces (represent the DB model and types of the columns associated with a specific DB table)

export async function signupUserController(request: Request, response: Response) : Promise<Response|undefined>  {
    try {

        const {userAllowContact, userEmail, userFirstName, userLastName, userZipCode, userPassword} = request.body;
        const userHash = await setHash(userPassword);
        const userActivationToken = setActivationToken();
        let date = new Date();
        const userStartDate = date.toISOString().slice(0, 19).replace('T', ' ');
        const userAdmin = false;
        const basePath = `${request.protocol}://${request.get('host')}${request.originalUrl}/activation/${userActivationToken}`

        const message = `<h2>Welcome to MissionCitizen.</h2>
<p>In order to get started, you must confirm your account </p>
<p><a href="${basePath}">${basePath}</a></p>`

        const mailgunMessage = {
            from: `Mailgun Sandbox <postmaster@${process.env.MAILGUN_DOMAIN}>`,
            to: userEmail,
            subject: "MissionCitizen -- Account Activation",
            text: 'Test email text',
            html: message
        }

        const user: User = {
            userId: null,
            userActivationToken,
            userAdmin,
            userAllowContact,
            userEmail,
            userFirstName,
            userHash,
            userLastName,
            userPhone: "",
            userProfileImage: "",
            userStartDate,
            userTotalHours: 0.00,
            userZipCode

        };

        const result = await insertUser(user)

        const emailComposer: MailComposer = new MailComposer(mailgunMessage)

        emailComposer.compile().build((error: any, message: Buffer) => {
            const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN});

            //console.log(message.toString("ascii"))

            const compiledEmail = {
                to: userEmail,
                message: message.toString("ascii")
            }

            const status: Status = {
                status: 200,

                message: "User successfully created please check your email.",

                data: null
            };
            mg.messages().sendMime(compiledEmail, (sendError: any, body: any) => {
                if (sendError) {
                    return response.json({status:418, data:null, message:"error sending email"})
                }
                return response.json(status);
            });
        })

    } catch (error: any) {
        return response.json({status: 500, message: error.message, data: null});

    }
}