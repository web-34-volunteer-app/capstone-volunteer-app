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
    unique (userEmail),
    INDEX (userEmail),
    PRIMARY KEY (userID)
);

create table event
(
    eventId                        BINARY(16)   NOT NULL,
    eventUserId                    BINARY(16)   NOT NULL,
    eventAddress                   VARCHAR(256) NOT NULL,
    eventDate                      DATETIME(6)  NOT NULL,
    eventDescription               blob         NOT NULL,
    eventDescriptionSkillsRequired VARCHAR(256),
    eventDescriptionTransportation boolean      NOT NULL,
    eventDescriptionTypeOfWork     VARCHAR(128),
    eventEndTime                   DATETIME(6)  NOT NULL,
    eventFlag                      boolean,
    eventLatitude                  VARCHAR(32)  NOT NULL,
    eventLongitude                 VARCHAR(32)  NOT NULL,
    eventOrganization              VARCHAR(64)  NOT NULL,
    eventStartTime                 DATETIME(6)  NOT NULL,
    INDEX (eventUserId),
    FOREIGN KEY (eventUserId) references user (userId),
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
    flagEventId binary(16) NOT NULL,
    flagUserId  binary(16) NOT NULL,
    flagMessage blob       NOT NULL,
    index (flagEventId),
    index (flagUserId),
    foreign key (flagEventId) references event (eventId),
    foreign key (flagUserId) references user (userId)
);

CREATE TABLE bookmarkedEvent
(
    bookMarkedEventEventID binary(16) NOT NULL,
    bookMarkedEventUserID  binary(16) NOT NULL,
    index (bookmarkedEventEventId),
    index (bookmarkedEventUserId),
    foreign key (bookmarkedEventEventId) references event (eventId),
    foreign key (bookmarkedEventUserId) references user (userId)
);

