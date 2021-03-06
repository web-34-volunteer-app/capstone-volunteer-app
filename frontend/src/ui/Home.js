import React from "react";
import {Image, Carousel, Container, Row, Col} from "react-bootstrap";
import PLaceHolderImage from "./images/MissionCitizenCousel.jpg"
import {Map} from "./Map";
import {EventList} from "./EventList";
import {SearchField} from "./SearchField";

export function Home() {

    return (
        <>
            <Container>
                <div className="col-12 col-lg-12 mx-auto mt-4"><Image
                    className="d-block w-100"
                    src={PLaceHolderImage}
                    alt="First slide"
                />

                </div>
                <div className="mt-3">

                </div>
                <div>
                    {/*<h3 id="MissionHours">PLACEHOLDER: volunteer hours </h3>*/}
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
                    <EventList/>
                </Row>
            </Container>
        </>
    )
}