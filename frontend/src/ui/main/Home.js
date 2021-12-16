import React, {useState} from "react";
import {Image, Container, Row, Col} from "react-bootstrap";
import PlaceHolderImage from "../images/MissionCitizenCousel.jpg"
import {Map} from "../Map";
import {EventList} from "../common/EventList";
import {SearchField} from "../SearchField";
import {useSelector} from "react-redux";
import {UserOverview} from "../UserOverview";

export function Home() {
    const auth = useSelector(state => state.auth);

    const [activeEvent, setActiveEvent] = useState(null);
    const [eventIsActive, setEventIsActive] = useState(false);

    const activeEventCallback = (eventId, open) => {
        setActiveEvent(eventId);
        setEventIsActive(open);
    }

    const getUserComponents = () => {
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
                        // setActiveEvent={activeEventCallback}
                        // activeEvent={activeEvent}
                        // eventIsActive={eventIsActive}
                    />
                    <EventList
                        key={'registeredEvents'}
                        option={'registeredEvents'}
                        header={"Events I'm Attending"}
                        colSize={6}
                        colClass={"mb-4"}
                        // setActiveEvent={activeEventCallback}
                        // activeEvent={activeEvent}
                        // eventIsActive={eventIsActive}
                    />
                </Row>

                <EventList
                    key={'bookmarkedEvents'}
                    option={'bookmarkedEvents'}
                    header={'Bookmarks'}
                    colSize={12}
                    colClass={"mb-4"}
                    // setActiveEvent={activeEventCallback}
                    // activeEvent={activeEvent}
                    // eventIsActive={eventIsActive}
                />
            </>
        );
    }

    const getVisitorComponents = () => {
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
    }

    const getCommonComponents = () => {
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
                                setActiveEvent={activeEventCallback}
                                activeEvent={activeEvent}
                                eventIsActive={eventIsActive}/>
                        </div>
                    </Col>
                    <EventList
                        key={'allEvents'}
                        option={'allEvents'}
                        header={'Local Events'}
                        colSize={6}
                        colClass={""}
                        setActiveEvent={activeEventCallback}
                        activeEvent={activeEvent}
                        eventIsActive={eventIsActive}
                    />
                </Row>
            </>
        );
    }

    const displayComponents = () => {
        let components = [];
        if (auth) {
            components.push(getUserComponents());
        } else {
            components.push(getVisitorComponents());
        }
        components.push(getCommonComponents());
        return components;
    }

    return (
        <Container>
            {displayComponents()}
        </Container>
    )
}