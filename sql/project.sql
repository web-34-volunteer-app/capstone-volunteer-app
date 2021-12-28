# DROP TABLE IF EXISTS flag;
# DROP TABLE IF EXISTS bookmarkedEvent;
# DROP TABLE IF EXISTS volunteer;
DROP TABLE IF EXISTS message;
# DROP TABLE IF EXISTS event;
# DROP TABLE IF EXISTS user;

# CREATE TABLE user
# (
#     userId              BINARY(16)   NOT NULL,
#     userActivationToken CHAR(32),
#     userAdmin           BOOLEAN      NOT NULL,
#     userAllowContact    BOOLEAN      NOT NULL,
#     userEmail           VARCHAR(128) NOT NULL,
#     userFirstName       VARCHAR(16)  NOT NULL,
#     userHash            CHAR(97)     NOT NULL,
#     userLastName        VARCHAR(32)  NOT NULL,
#     userPhone           VARCHAR(10),
#     userProfileImage    VARCHAR(128),
#     userStartDate       DATETIME(6)  NOT NULL,
#     userTotalHours      DECIMAL(6, 2),
#     userZipCode         VARCHAR(10),
#     UNIQUE (userEmail),
#     INDEX (userEmail),
#     PRIMARY KEY (userID)
# );

# CREATE TABLE event
# (
#     eventId                        BINARY(16)    NOT NULL,
#     eventUserId                    BINARY(16)    NOT NULL,
#     eventAddress                   VARCHAR(256)  NOT NULL,
#     eventDate                      DATETIME(6)   NOT NULL,
#     eventDescription               VARCHAR(1024) NOT NULL,
#     eventDescriptionSkillsRequired VARCHAR(256),
#     eventDescriptionTransportation BOOLEAN       NOT NULL,
#     eventDescriptionTypeOfWork     VARCHAR(128),
#     eventEndTime                   DATETIME(6)   NOT NULL,
#     eventFlag                      BOOLEAN,
#     eventLatitude                  VARCHAR(32)   NOT NULL,
#     eventLongitude                 VARCHAR(32)   NOT NULL,
#     eventOrganization              VARCHAR(64)   NOT NULL,
#     eventStartTime                 DATETIME(6)   NOT NULL,
#     eventTitle                     VARCHAR(64)   NOT NULL,
#     INDEX (eventUserId),
#     FOREIGN KEY (eventUserId) REFERENCES user (userId) ON DELETE CASCADE,
#     PRIMARY KEY (eventId)
# );

# ParentId determines if the message is posted in an event forum, an inbox/outbox, or attached as a reply to another message
CREATE TABLE message
(
    messageId              BINARY(16)    NOT NULL,
    messageUserId          BINARY(16)    NOT NULL,
#     messageParentId BINARY(16) NOT NULL,
    messageParentEventId   BINARY(16),
    messageParentMessageId BINARY(16),
    messageParentUserId    BINARY(16),
    messageBody            VARCHAR(1024) NOT NULL,
    messageSubject         VARCHAR(128),
    messageTimeStamp       VARCHAR(32)   NOT NULL,
    INDEX (messageId),
    INDEX (messageUserId),
#     INDEX (messageParentId),
    INDEX (messageParentEventId),
    INDEX (messageParentMessageId),
    INDEX (messageParentUserId),
    PRIMARY KEY (messageId),
    FOREIGN KEY (messageUserId) REFERENCES user (userId),
#     FOREIGN KEY (messageParentId) REFERENCES event (eventId)
    CONSTRAINT eventParent_FK FOREIGN KEY (messageParentEventId) REFERENCES event (eventId) ON DELETE CASCADE,
    CONSTRAINT messageParent_FK FOREIGN KEY (messageParentMessageId) REFERENCES message (messageId) ON DELETE CASCADE,
    CONSTRAINT userParent_FK FOREIGN KEY (messageParentUserId) REFERENCES user (userId) ON DELETE CASCADE,
    CONSTRAINT singleParent CHECK (
                messageParentEventId IS NOT NULL AND messageParentMessageId IS NULL AND messageParentUserId IS NULL OR
                messageParentEventId IS NULL AND messageParentMessageId IS NOT NULL AND messageParentUserId IS NULL OR
                messageParentEventId IS NULL AND messageParentMessageId IS NULL AND messageParentUserId IS NOT NULL)
);

# CREATE TABLE volunteer
# (
#     volunteerEventId                BINARY(16) NOT NULL,
#     volunteerUserId                 BINARY(16) NOT NULL,
#     volunteerHours                  DECIMAL(6, 2),
#     volunteerHoursPosterVerified    BOOLEAN,
#     volunteerHoursVolunteerVerified BOOLEAN,
#     INDEX (volunteerEventId),
#     INDEX (volunteerUserId),
#     FOREIGN KEY (volunteerEventId) REFERENCES event (eventId) ON DELETE CASCADE,
#     FOREIGN KEY (volunteerUserId) REFERENCES user (userId) ON DELETE CASCADE,
#     PRIMARY KEY (volunteerEventId, volunteerUserId)
# );

# CREATE TABLE bookmarkedEvent
# (
#     bookmarkedEventEventId BINARY(16) NOT NULL,
#     bookmarkedEventUserId  BINARY(16) NOT NULL,
#     INDEX (bookmarkedEventEventId),
#     INDEX (bookmarkedEventUserId),
#     FOREIGN KEY (bookmarkedEventEventId) REFERENCES event (eventId) ON DELETE CASCADE,
#     FOREIGN KEY (bookmarkedEventUserId) REFERENCES user (userId) ON DELETE CASCADE,
#     PRIMARY KEY (bookmarkedEventEventId, bookmarkedEventUserId)
# );
#
# CREATE TABLE flag
# (
#     flagEventId BINARY(16)    NOT NULL,
#     flagUserId  BINARY(16)    NOT NULL,
#     flagMessage varchar(1024) NOT NULL,
#     INDEX (flagEventId),
#     INDEX (flagUserId),
#     FOREIGN KEY (flagEventId) REFERENCES event (eventId) ON DELETE CASCADE,
#     FOREIGN KEY (flagUserId) REFERENCES user (userId) ON DELETE CASCADE,
#     PRIMARY KEY (flagEventId, flagUserId)
# );



