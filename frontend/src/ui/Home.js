import React from "react";
import HeaderImage from "./images/HeaderLogoImage.svg"
import {Image, Carousel, Container, InputGroup, FormControl, Row, Col} from "react-bootstrap";
import PLaceHolderImage from "./images/PlaceHolder.svg"
import {Map} from "./Map";
import {Accordion} from "react-bootstrap";

export function Home() {
    return (
        <>
            <Container>
                <div className="col-8 col-lg-6 mx-auto my-5">

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
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                    <FormControl
                        aria-label="Search"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
            </Container>
            <Container>
                <Row className="my-4">

                        <Col md={{span:4, offset: 1}} >

                            <Map/>
                        </Col>

                    <Col md={{span:4, offset: 1}} className="d-block mx-auto">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Volunteer Opportunity Event 1</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Volunteer Opportunity Event 2</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                    est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </>
    )

}