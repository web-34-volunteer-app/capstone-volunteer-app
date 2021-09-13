export const eventValidator = {
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
                errorMessage: 'please provide a date',
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
                errorMessage: 'eventDescriptionSkillsRequired',
                nullable:true,
            },
        },
    },
    eventDescriptionTransportation:{
        isBoolean: {
            errorMessage: 'eventDescriptionTransportation',
            loose: false,
        },
    },

    eventEndTime:{
        toDate: true,
        optional: {
            options: {
                errorMessage: 'please provide an end date',
                nullable:true,
            },
        },
    },
    // eventFlag:{
    //     isBoolean: {
    //         errorMessage: 'eventFlag',
    //         loose: false,
    //         optional: {
    //             options: {
    //                 nullable:true,
    //             },
    //         },
    //     },
    // },
    eventOrganization:{
        isString: {
            options: true,
            errorMessage: 'eventOrganization'
        }
    },

    eventStartTime:{
        toDate: true,
        optional: {
            options: {
                errorMessage: 'please provide a start date',
                nullable:true,
            },
        },
    },
    eventTitle:{
        isString: {
            options: true,
            errorMessage: 'eventTitle'
        }
    },

};