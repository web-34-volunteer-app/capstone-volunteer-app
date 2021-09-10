export interface Event {
    eventId: string|null;
    eventUserId: string;
    eventAddress: string;
    eventDate: Date;
    eventDescription: string;
    eventDescriptionSkillsRequired: string|null;
    eventDescriptionTransportation: boolean;
    eventDescriptionTypeOfWork: string|null;
    eventEndTime: Date;
    eventFlag: boolean|null;
    eventLatitude: string|null;
    eventLongitude: string|null;
    eventOrganization: string;
    eventStartTime: Date;
    eventTitle: string;
}


