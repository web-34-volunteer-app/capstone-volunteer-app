CREATE TABLE flag(
    flagEventId binary(16) NOT NULL,
    flagUserId binary(16) NOT NULL,
    flagMessage blob NOT NULL,
    index(flagEventId),
    index(flagUserId),
    foreign key(flagEventId) references (eventId),
    foreign key(flagUserId) references (userId)
);

CREATE TABLE bookmarkedEvent(
    bookMarkedEventEventID binary(16) NOT NULL,
    bookMarkedEventUserID binary(16) NOT NULL,
    index(bookmarkedEventEventId),
    index(bookmarkedEventUserId),
    foreign key(bookmarkedEventEventId) references (eventId),
    foreign key(bookmarkedEventUserId) references (userId)
);