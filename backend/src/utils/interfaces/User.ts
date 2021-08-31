export interface PartialUser {
    userId: string|null,
    userAdmin: boolean | null,
    userAllowContact: boolean | null,
    userEmail: string,
    userFirstName: string| null,
    userLastName: string| null,
    userProfileImage: string,
    userStartDate: string,
    userTotalHours: string,
    userZipCode: string
}

export interface User {
    userId: string|null,
    userActivationToken: string| null,
    userAdmin: boolean | null,
    userAllowContact: boolean | null,
    userEmail: string,
    userFirstName: string| null,
    userHash: string,
    userLastName: string| null,
    userProfileImage: string,
    userStartDate: string,
    userTotalHours: string,
    userZipCode: string
}