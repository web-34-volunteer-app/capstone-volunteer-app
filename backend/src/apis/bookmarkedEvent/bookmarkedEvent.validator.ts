export const bookmarkedEventValidator = {
    bookmarkedEventEventId: {
        isUUID: {
            errorMessage: 'please provide a valid bookmarkedEventEventId'
        }
    },
    bookmarkedEventUserId: {
        isUUID: {
            errorMessage: 'please provide a valid bookmarkedEventUserId'
        }
    }
}