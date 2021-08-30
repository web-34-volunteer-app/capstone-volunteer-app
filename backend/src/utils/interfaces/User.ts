export interface PartialUser {
    userId: string|null,
    userAdmin: boolean | null,
    userAllowContact: boolean | null,
    userEmail: string| null,
    userFirstName: string| null,
    userLastName: string| null,
    userPhone: string,
    userProfileImage: string,
    userStartDate: string,
    userTotalHours: string,
    userZipCode: string
}

export interface User {
    userId: string | null,
    userActivationToken: string | null,
    userAdmin: boolean,
    userAllowContact: boolean,
    userEmail: string,
    userFirstName: string,
    userHash: string | null,
    userLastName: string,
    userPhone: string | null,
    userProfileImage: string | null,
    userStartDate: string | null,
    userTotalHours: number | null,
    userZipCode: string | null
}