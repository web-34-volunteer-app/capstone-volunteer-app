DROP TABLE IF EXISTS flag;
DROP TABLE IF EXISTS bookmark;
DROP TABLE IF EXISTS volunteer;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    userId              BINARY(16)   NOT NULL,
    userActivationToken CHAR(32),
    userAdmin           BOOLEAN      NOT NULL,
    userAllowContact    BOOLEAN      NOT NULL,
    userEmail           VARCHAR(128) NOT NULL,
    userFirstName       VARCHAR(16)  NOT NULL,
    userHash            CHAR(97)     NOT NULL,
    userLastName        VARCHAR(32)  NOT NULL,
    userProfileImage    VARCHAR(128),
    userStartDate       DATETIME(6)  NOT NULL,
    userTotalHours      DECIMAL(6, 2),
    userZipCode         VARCHAR(10)  NOT NULL,
    INDEX (userEmail),
    PRIMARY KEY (userID)
);

create table event
(
    eventId                        BINARY(16)   NOT NULL,
    eventUserId                    BINARY       NOT NULL,
    eventDate                      DATETIME(6)  NOT NULL,
    eventDescription               BLOB         NOT NULL,
    eventDescriptionSkillsRequired VARCHAR(256),
    eventDescriptionTransportation boolean      NOT NULL,
    eventDescriptionTypeOfWork     VARCHAR(128) NOT NULL,
    eventEndTime                   TIME(4),
    eventFlag                      boolean,
    eventLatitude                  VARCHAR(32)  NOT NULL,
    eventLongitude                 VARCHAR(32)  NOT NULL,
    eventOrganization              VARCHAR(64)  NOT NULL,
    eventStartTime                 TIME(4),
    INDEX (eventUserId),
    FOREIGN KEY (eventUserId) REFERENCES user (userId),
    PRIMARY KEY (eventId)
);

CREATE TABLE volunteer
(
    volunteerEventId                BINARY(16) NOT NULL,
    volunteerUserId                 BINARY(16) NOT NULL,
    volunteerHours                  DECIMAL(6, 2),
    volunteerHoursPosterVerified    BOOLEAN,
    volunteerHoursVolunteerVerified BOOLEAN,
    INDEX (volunteerEventId),
    INDEX (volunteerUserId),
    FOREIGN KEY (volunteerEventId) REFERENCES event (eventId),
    FOREIGN KEY (volunteerUserId) REFERENCES user (userId)
);

CREATE TABLE flag
(
    flagEventId BINARY(16) NOT NULL,
    flagUserId  BINARY(16) NOT NULL,
    flagMessage BLOB       NOT NULL,
    INDEX (flagEventId),
    INDEX (flagUserId),
    FOREIGN KEY (flagEventId) REFERENCES event (eventId),
    FOREIGN KEY (flagUserId) REFERENCES user (userId)
);

CREATE TABLE bookmarkedEvent
(
    bookMarkedEventEventID BINARY(16) NOT NULL,
    bookMarkedEventUserID  BINARY(16) NOT NULL,
    INDEX (bookmarkedEventEventId),
    INDEX (bookmarkedEventUserId),
    FOREIGN KEY (bookmarkedEventEventId) REFERENCES event (eventId),
    FOREIGN KEY (bookmarkedEventUserId) REFERENCES user (userId)
);