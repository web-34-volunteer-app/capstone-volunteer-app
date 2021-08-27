export interface Event {
    eventId: string|null;
    eventUserId: string|null;
    eventDate: Date|null;
    eventDescription: string|null;
    eventDescriptionSkillsRequired: string;
    eventDescriptionTransportation: boolean|null;
    eventDescriptionTypeOfWork: string|null;
    eventEndTime: number|null;
    eventFlag: boolean;
    eventLatitude: string|null;
    eventLongitude: string|null;
    eventOrganization: string|null;
    eventStartTime: number|null;
}


