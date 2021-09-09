DROP TABLE IF EXISTS flag;
DROP TABLE IF EXISTS bookmarkedEvent;
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
    userPhone           VARCHAR(10),
    userProfileImage    VARCHAR(128),
    userStartDate       DATETIME(6)  NOT NULL,
    userTotalHours      DECIMAL(6, 2),
    userZipCode         VARCHAR(10),
    UNIQUE (userEmail),
    INDEX (userEmail),
    PRIMARY KEY (userID)
);

CREATE TABLE event
(
    eventId                        BINARY(16)    NOT NULL,
    eventUserId                    BINARY(16)    NOT NULL,
    eventAddress                   VARCHAR(256)  NOT NULL,
    eventDate                      DATETIME(6)   NOT NULL,
    eventDescription               VARCHAR(1024) NOT NULL,
    eventDescriptionSkillsRequired VARCHAR(256),
    eventDescriptionTransportation BOOLEAN      NOT NULL,
    eventDescriptionTypeOfWork     VARCHAR(128),
    eventEndTime                   DATETIME(6)  NOT NULL,
    eventFlag                      BOOLEAN,
    eventLatitude                  VARCHAR(32)  NOT NULL,
    eventLongitude                 VARCHAR(32)  NOT NULL,
    eventOrganization              VARCHAR(64)  NOT NULL,
    eventStartTime                 DATETIME(6)  NOT NULL,
    eventTitle                      VARCHAR(256),
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
    FOREIGN KEY (volunteerUserId) REFERENCES user (userId),
    PRIMARY KEY (volunteerEventId, volunteerUserId)
);

CREATE TABLE flag
(

    flagEventId BINARY(16)    NOT NULL,
    flagUserId  BINARY(16)    NOT NULL,
    flagMessage varchar(1024) NOT NULL,
    INDEX (flagEventId),
    INDEX (flagUserId),
    FOREIGN KEY (flagEventId) REFERENCES event (eventId),
    FOREIGN KEY (flagUserId) REFERENCES user (userId),
    PRIMARY KEY (flagEventId, flagUserId)

);



CREATE TABLE `bookmarkedEvent`
(
    bookmarkedEventEventId BINARY(16) NOT NULL,
    bookmarkedEventUserId  BINARY(16) NOT NULL,
    INDEX (bookmarkedEventEventId),
    INDEX (bookmarkedEventUserId),
    FOREIGN KEY (bookmarkedEventEventId) REFERENCES event (eventId),
    FOREIGN KEY (bookmarkedEventUserId) REFERENCES user (userId),
    PRIMARY KEY (bookmarkedEventEventId, bookmarkedEventUserId)
);

