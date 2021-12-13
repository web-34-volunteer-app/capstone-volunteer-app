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
                <UserOverview/>
                <EventList
                    option={'coordinatedEvents'}
                    header={"Events I'm Coordinating"}
                    colSide={12}
                    colClass={"mb-4"}
                />
                <EventList
                    option={'registeredEvents'}
                    header={"Events I'm Attending"}
                    colSize={12}
                    colClass={"mb-4"}
                />
                <EventList
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
            <>
                <div className="col-12 col-lg-12 mx-auto mt-4">
                    <Image
                        className="d-block w-100"
                        src={PlaceHolderImage}
                        alt="First slide"
                    />
                </div>
            </>
        );
    }

    const getCommonComponents = () => {
        return (
            <>
                <SearchField/>
                <Row g={3} className="my-4">
                    <Col md={6}>
                        <div className="d-flex justify-content-center">
                            <Map width={"50vw"} height={"40vh"}/>
                        </div>
                    </Col>
                    <EventList
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
        if(auth) {
            components.push(getUserComponents());
        } else {
            components.push(getVisitorComponents());
        }
        components.push(getCommonComponents());
        return components;
    }

    return (
        <>
            <Container>
                {displayComponents()}
            </Container>
        </>
    )
}