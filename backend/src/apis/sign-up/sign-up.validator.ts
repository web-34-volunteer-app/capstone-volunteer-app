export const signupValidator = {
    userAllowContact: {
        isBoolean: {
            loose: false
        }
    },
    userEmail: {
        isEmail: {
            errorMessage: 'Please provide a valid email'
        },
        // Uncomment the next line to sanitize email, but it removes +1 from testing email addresses.
        // normalizeEmail: true,
        trim: true
    },
    userFirstName: {
        isAlpha: {
            errorMessage: "Please use letters only"
        }
    },
    userLastName: {
        isAlpha: {
            errorMessage: "Please use letters only"
        }
    },
    userPassword: {
        isLength: {
            errorMessage: 'Password must be at least eight characters',
            options: { min: 8 }
        },
        trim: true,
        escape: true
    },
    userPasswordConfirm: {
        isLength: {
            errorMessage: 'confirm password must be at least eight characters',
            options: { min: 8 }
        },
        trim: true,
        escape: true
    },
    userPhone: {
        isMobilePhone: {
            errorMessage: "please provide a valid mobile phone number"
        },
        optional: {
            options: {
                nullable: true
            }
        }
    },
    userProfileImage: {
        optional: {
            nullable: true
        },
        // isURL: {
        //     errorMessage: "profile avatar is malformed please upload a new image"
        // }
    },
    userZipCode: {
        optional: {
            nullable: true
        },
        isNumeric: {
            errorMessage: "please use numbers only",
            options: { min: 5 }
        }
    }
};