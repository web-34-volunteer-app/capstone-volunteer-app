import React, {useCallback, useMemo, useState} from "react";
import {Image, Container, Row, Col} from "react-bootstrap";
import PlaceHolderImage from "../images/MissionCitizenCousel.jpg"
import {Map} from "../Map";
import {EventList} from "../common/EventList";
import {SearchField} from "../SearchField";
import {UserOverview} from "../UserOverview";

import {useDispatch, useSelector} from "react-redux";
import {fetchUserByUserId} from "../../store/user";
import {fetchAllEvents} from "../../store/event";
import {fetchCoordinatedEventByUserId} from "../../store/eventscoordinatedbycurrentuser";
import {fetchRegisteredEventByUserId} from "../../store/eventsregisteredbyuser";
import {fetchBookmarkedEventByUserId} from "../../store/eventsbookmarkedbycurrentuser";
import {fetchAuth} from "../../store/auth";

export const StoreContext = React.createContext("storeContext");
export const MapContext = React.createContext("mapContext");

export function Home() {
    const dispatch = useDispatch();

    //START MAP POPUP CALLBACK
    const [activeEvent, setActiveEvent] = useState(null);
    //END MAP POPUP CALLBACK

    //START MAP CONTEXT VALUES
    const mapContextValues = {
        activeEvent: activeEvent,
        setActiveEvent: setActiveEvent
    }
    //END MAP CONTEXT VALUES

    //START COMPONENT FUNCTIONS
    const getUserComponents = useMemo(() => {
        return (
            <>
                <UserOverview key={'userOverview'}/>
                <Row>
                    <EventList
                        key={'coordinatedEvents'}
                        option={'coordinatedEvents'}
                        header={"Events I'm Coordinating"}
                        colSide={6}
                        colClass={"mb-4"}
                    />
                    <EventList
                        key={'registeredEvents'}
                        option={'registeredEvents'}
                        header={"Events I'm Attending"}
                        colSize={6}
                        colClass={"mb-4"}
                    />
                </Row>
            </>
        );
    }, []);

    const getVisitorComponents = useMemo(() => {
        return (
            <div key={'visitorImageDivWrapper'} className="col-12 col-lg-12 mx-auto mt-4">
                <Image
                    key={'visitorImage'}
                    className="d-block w-100"
                    src={PlaceHolderImage}
                    alt="First slide"
                />
            </div>
        );
    }, [])

    const getCommonComponents = useMemo(() => {
        return (
            <>
                <SearchField key={"searchField"}/>
                <Row key={'mapRow'} g={3} className="my-4">
                    <Col key={'mapCol'} md={6}>
                        <div key={'mapDivWrapper'} className="d-flex justify-content-center">
                            <Map
                                key={"map"}
                                width={"50vw"}
                                height={"40vh"}
                            />
                        </div>
                    </Col>
                    <EventList
                        key={'allEvents'}
                        option={'allEvents'}
                        header={'Local Events'}
                        colSize={6}
                        colClass={""}
                    />
                </Row>
            </>
        );
    }, []);
    //END COMPONENT FUNCTIONS

    //START CURRENT USER
    const currentUserEffect = useCallback(() => {
        dispatch(fetchUserByUserId());
    }, [dispatch]);
    React.useEffect(currentUserEffect, [currentUserEffect]);
    const currentUser = useSelector(state => state.user ? state.user : null);
    //END CURRENT USER

    //START ALL EVENTS
    const allEventsEffect = useCallback(() => {
        dispatch(fetchAllEvents());
    }, [dispatch]);
    React.useEffect(allEventsEffect, [allEventsEffect]);
    const allEvents = useSelector(state => state.events ? state.events : null);
    //END ALL EVENTS

    //START COORDINATED EVENTS
    const coordinatedEventsEffect = useCallback(() => {
        dispatch(fetchCoordinatedEventByUserId());
    }, [dispatch]);
    React.useEffect(coordinatedEventsEffect, [coordinatedEventsEffect]);
    const coordinatedEvents = useSelector(state => state.coordinated ? state.coordinated : null);
    //END COORDINATED EVENTS

    //START REGISTERED EVENTS
    const registeredEventsEffect = useCallback(() => {
        dispatch(fetchRegisteredEventByUserId());
    }, [dispatch]);
    React.useEffect(registeredEventsEffect, [registeredEventsEffect]);
    const registeredEvents = useSelector(state => state.registered ? state.registered : null);
    //END REGISTERED EVENTS

    //START BOOKMARKED EVENTS
    const bookmarkedEventsEffect = useCallback(() => {
        dispatch(fetchBookmarkedEventByUserId());
    }, [dispatch]);
    React.useEffect(bookmarkedEventsEffect, [bookmarkedEventsEffect]);
    const bookmarkedEvents = useSelector(state => state.bookmarked ? state.bookmarked : null);
    //END BOOKMARKED EVENTS

    //START AUTH
    const auth = useSelector(state => state.auth);
    const authEffect = useCallback(() => {
        dispatch(fetchAuth());
        if (auth) {
            currentUserEffect();
            coordinatedEventsEffect();
            registeredEventsEffect();
            bookmarkedEventsEffect();
            setDisplayComponents(getUserComponents);
        } else {
            setDisplayComponents(getVisitorComponents);
        }
    },[dispatch,
        auth,
        getUserComponents,
        getVisitorComponents,
        currentUserEffect,
        coordinatedEventsEffect,
        registeredEventsEffect,
        bookmarkedEventsEffect]);
    React.useEffect(authEffect, [authEffect]);
    //END AUTH

    //START STORECONTEXT VALUES
    const contextValues = {
        dispatch: dispatch,
        auth: auth,
        currentUser: currentUser,
        allEvents: allEvents,
        coordinatedEvents: coordinatedEvents,
        registeredEvents: registeredEvents,
        bookmarkedEvents: bookmarkedEvents
    }
    //END STORECONTEXT VALUES

    const initDisplayComponents = useMemo(() => {
        if (auth) {
            return (
                getUserComponents
            );
        } else {
            return (
                getVisitorComponents
            );
        }
    }, [auth, getUserComponents, getVisitorComponents]);

    const [displayComponents, setDisplayComponents] = useState(initDisplayComponents);

    return (
        <MapContext.Provider value={{...mapContextValues}}>
            <StoreContext.Provider value={{...contextValues}}>
                <Container>
                    {displayComponents}
                    {getCommonComponents}
                </Container>
            </StoreContext.Provider>
        </MapContext.Provider>
    );
}

