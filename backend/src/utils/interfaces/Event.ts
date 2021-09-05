export interface Event {
    eventId: string|null;
    eventUserId: string;
    eventAddress: string;
    eventDate: Date|null;
    eventDescription: string;
    eventDescriptionSkillsRequired: string|null;
    eventDescriptionTransportation: boolean;
    eventDescriptionTypeOfWork: string|null;
    eventEndTime: number;
    eventFlag: boolean|null;
    eventLatitude: string|null;
    eventLongitude: string|null;
    eventOrganization: string;
    eventStartTime: number;
}


