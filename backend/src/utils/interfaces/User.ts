export interface PartialUser {
    userId: string|null,
    userAdmin: boolean,
    userAllowContact: boolean,
    userEmail: string,
    userFirstName: string,
    userLastName: string,
    userPhone: string,
    userProfileImage: string,
    userStartDate: string,
    userTotalHours: number,
    userZipCode: string
}

export interface User {
    userId: string | null,
    userActivationToken: string | null,
    userAdmin: boolean,
    userAllowContact: boolean,
    userEmail: string,
    userFirstName: string,
    userHash: string,
    userLastName: string,
    userPhone: string,
    userProfileImage: string,
    userStartDate: string,
    userTotalHours: number,
    userZipCode: string
}