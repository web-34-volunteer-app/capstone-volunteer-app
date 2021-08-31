export const flagValidator = {
    flagEventId: {
        isUUID: {
            errorMessage: 'please provide a valid flagEventId'
        }
    },
    flagUserId: {
        isUUID: {
            errorMessage: 'please provide valid flagUserId'
        }
    },
    flagMessage: {
        isLength: {
            errorMessage: 'a flag message cannot be longer than 140 characters',
            options: {max: 140}
        }
    }
};