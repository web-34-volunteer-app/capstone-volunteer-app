export const eventValidator = {
    eventUserId: {
        isString: {
            errorMessage: 'Please provide a valid eventUserId'
        }
    },
    eventAddress: {
        isString: {
            errorMessage: 'please provide an address',
            options: true
        },
        trim: true,
        escape: true
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