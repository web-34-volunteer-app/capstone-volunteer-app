DROP TABLE IF EXISTS flag;
DROP TABLE IF EXISTS bookmark;
DROP TABLE IF EXISTS volunteer;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    userID BINARY(16) NOT NULL,
    userActivationToken CHAR (32),
    userAdmin BOOLEAN NOT NULL,
    userAllowContact BOOLEAN NOT NULL,
    userEmail VARCHAR(128) NOT NULL,
    userFirstName VARCHAR(16) NOT NULL,
    userHash CHAR(97) NOT NULL,
    userLastName VARCHAR(32) NOT NULL,
    userProfileImage VARCHAR (128),
    userStartDate DATETIME(6) NOT NULL,
    userTotalHours DECIMAL(6,2),
    userZipCode VARCHAR(10) NOT NULL,
    INDEX (userEmail),
    PRIMARY KEY (userID)
);
