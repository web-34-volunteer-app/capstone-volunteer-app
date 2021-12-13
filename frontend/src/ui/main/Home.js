import React from "react";
import {Image, Container, Row, Col} from "react-bootstrap";
import PlaceHolderImage from "../images/MissionCitizenCousel.jpg"
import {Map} from "../Map";
import {EventList} from "../common/EventList";
import {SearchField} from "../SearchField";
import {useSelector} from "react-redux";
import {UserOverview} from "../UserOverview";

export function Home() {
    const auth = useSelector(state => state.auth);

    const getUserComponents = () => {
        return (
            <>
                <UserOverview key={'userOverview'}/>
                <EventList
                    key={'coordinatedEvents'}
                    option={'coordinatedEvents'}
                    header={"Events I'm Coordinating"}
                    colSide={12}
                    colClass={"mb-4"}
                />
                <EventList
                    key={'registeredEvents'}
                    option={'registeredEvents'}
                    header={"Events I'm Attending"}
                    colSize={12}
                    colClass={"mb-4"}
                />
                <EventList
                    key={'bookmarkedEvents'}
                    option={'bookmarkedEvents'}
                    header={'Bookmarks'}
                    colSize={12}
                    colClass={"mb-4"}
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
                            <Map key={"map"} width={"50vw"} height={"40vh"}/>
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