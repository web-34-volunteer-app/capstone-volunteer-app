drop table if exists event;
drop table if exists user;

create table user (
                      userId binary(16) not null,
                      primary key (userId)
);


create table event (
                       eventId binary(16) not null,
                       eventUserId binary not null,
                       eventDate datetime(6) not null,
                       eventDescription blob not null,
                       eventDescriptionSkillsRequired varchar(256),
                       eventDescriptionTransportation boolean not null,
                       eventDescriptionTypeOfWork varchar(128) not null,
                       eventEndTime time(4),
                       eventFlag boolean,
                       eventLatitude varchar(32) not null,
                       eventLongitude varchar(32) not null,
                       eventOrganization varchar(64) not null,
                       eventStartTime time(4),
                       index (eventUserId),
                       foreign key (eventUserId) references user(userId),
                       primary key (eventId)
);