import {Schema} from "express-validator";


// userId, userActivationToken, userAdmin, userAllowContact, userEmail, userFirstName, userHash, userLastName, userProfileImage, userStartDate, userTotalHours, userZip


export const userValidator : Schema = {
    userId: {
        isUUID: {
            errorMessage: 'please provide a valid userId'
        }
    },

    userEmail: {
        isEmail: {
            errorMessage: 'Please provide a valid email'
        },
        trim: true
    },

    userFirstName: {
        isString: {
            errorMessage: 'Please provide a valid first name'
        },
        trim: true
    },

    userLastName: {
        isString: {
            errorMessage: 'Please provide a valid last name'
        },
        trim: true
    },

    userProfileImage: {
        optional: {
            options: {
                nullable: true
            }
        },
        isURL: {
            errorMessage: "user image is malformed please upload a new image"
        },
    },

    userZipCode: {
        isString: {
            errorMessage: 'Please provide a valid zip code'
        },
        trim: true
    },

};
