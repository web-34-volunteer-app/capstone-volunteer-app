CREATE TABLE event(
                    eventId BINARY(16) NOT NULL,
                    PRIMARY KEY (eventId)
);



CREATE TABLE user(
                    userId BINARY(16) NOT NULL,
                    PRIMARY KEY (userId)
);


CREATE TABLE volunteer(
                        volunteerEventId BINARY(16) NOT NULL,
                        volunteerUserId BINARY(16) NOT NULL,
                        volunteerHours DECIMAL(6,2),
                        volunteerHoursPosterVerified BOOLEAN,
                        volunteerHoursVolunteerVerified BOOLEAN,
                        INDEX (volunteerEventId),
                        INDEX (volunteerUserId),
                        FOREIGN KEY (volunteerEventId) REFERENCES event(eventId),
                        FOREIGN KEY (volunteerUserId) REFERENCES user(userId)
);