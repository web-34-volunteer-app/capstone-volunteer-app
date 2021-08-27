export interface PartialUser {
    userId: string | null,
    userEmail: string| null,
    userPhone: string,
}

export interface User {
    userId: string|null,
    userActivationToken: string|null,
    userAdmin: boolean | null,
    userAllowContact: boolean | null,
    userEmail: string| null,
    userFirstName: string| null,
    userHash: string| null,
    userLastName: string| null,
    userProfileImage: string,
    userStartDate: string,
    userTotalHours: string,
    userZipCode: string
}