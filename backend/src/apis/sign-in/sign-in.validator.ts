export const signInValidator = {
    userPassword: {
        isLength: {
            errorMessage: 'Password must be at least eight characters',
            options: { min: 8 }
        },
        trim: true,
        escape: true
    },
    userEmail: {
        isEmail: {
            errorMessage: 'Please provide a valid email'
        },
        trim: true
    }
};