export const eventValidator = {
    eventUserId: {
        isUUID: {
            errorMessage: 'please provide a valid eventUserId'
        }
    },
    eventDate: {
        toDate: true,
        optional: {
            options: {
                nullable:true,
            },
        },
    },
    eventDescription: {
        isString: {
            errorMessage: 'please add event description',
            options: true
        },
        trim: true,
        escape: true
    },
    eventDescriptionSkillsRequired:{
        isString: true,
        optional: {
            options: {
            nullable:true,
            },
        },
    },
    eventDescriptionTransportation:{
        isBoolean: {
            loose: false,
        },
    },
    eventDescriptionTypeOfWork:{
        isString: true,
        optional: {
            options: {
                nullable:true,
            },
        },
    },
    eventEndTime:{
        isDate:true,
        optional: {
            options: {
                nullable: true,
            },
        }
    },
    eventFlag:{
        isBoolean: {
            loose: false,
            optional: {
                options: {
                    nullable:true,
                },
            },
        },
    },
    eventLatitude:{
        optional: {
            nullable: true,
        },
        isNumeric: {
            errorMessage: "please use numbers only",
            options: { min: 5 },
        },
    },
    eventLongitude:{
        optional: {
            nullable: true,
        },
        isNumeric: {
            errorMessage: "please use numbers only",
            options: { min: 5 },
        },
    },
    eventOrganization:{
        isString:true
    },
    eventStartTime:{

        isDate:true,
        optional: {
            options: {
                nullable: true,
            },
        }
    }

};