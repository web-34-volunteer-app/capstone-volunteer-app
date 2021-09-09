import React from "react";
import HeaderImage from "./images/MC5.svg"
import {Image, Carousel, Container, InputGroup, FormControl, Row, Col} from "react-bootstrap";
import PLaceHolderImage from "./images/PlaceHolder.svg"
import {Map} from "./Map";
import {Accordion} from "react-bootstrap";
import {EventList} from "./EventList";
import {SearchField} from "./SearchField";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllEvents} from "../store/event";

export function Home() {
    const dispatch = useDispatch();
    const initialEffect = () => {
        dispatch(fetchAllEvents());
    }
    React.useEffect(initialEffect, [dispatch])
    const events = useSelector(state => state.events ? state.events : []);
    console.log(events);
    return (
        <>
            <Container>
                <div className="col-8 col-lg-3 mx-auto my-5">

                    <Image src={HeaderImage} alt="headerImage" className="d-block"/>
                </div>
                <div className="col-12 col-lg-8 mx-auto">
                    <Carousel variant="dark">
                        <Carousel.Item>
                            <Image
                                className="d-block w-100"
                                src={PLaceHolderImage}
                                alt="First slide"
                            />

                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                className="d-block w-100"
                                src={PLaceHolderImage}
                                alt="Second slide"
                            />

                        </Carousel.Item>
                        <Carousel.Item>
                            <Image
                                className="d-block w-100"
                                src={PLaceHolderImage}
                                alt="Third slide"
                            />

                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="mt-3">
                    <h4>
                        Mission Statement:
                    </h4>
                    <p>Thank you for visiting MissionCitizen, a site dedicated to making volunteerism easy! Here at
                        MissionCitizen, we believe giving back is our mission and civic duty. Consider becoming a
                        MissionCitizen today!</p>
                </div>
                <div>
                    <h3 id="MissionHours">PLACEHOLDER: volunteer hours </h3>
                </div>
                <SearchField/>
            </Container>
            <Container>
                <Row g={3} className="my-4">
                    <Col md={6}>
                        <div className="d-flex justify-content-center">
                            <Map width={"50vw"} height={"40vh"}/>
                        </div>
                    </Col>
                    <EventList events={events}/>
                </Row>
            </Container>
        </>
    )

}