import React from "react";
import HeaderImage from "./images/HeaderLogoImage.svg"
import {Image, Carousel, Container, InputGroup, FormControl, Card} from "react-bootstrap";
import PLaceHolderImage from "./images/PlaceHolder.svg"
import MapBoxPlaceHolder from "./images/MapBoxAsset.png"
import CardHeader from "react-bootstrap/CardHeader";
import {button} from "bootstrap";

export function Home(){

    return (
        <>
<Container>
            <div className="col-8 col-lg-6 d-flex align-content-center">

                <Image src={HeaderImage} alt="headerImage" className="d-block"/>
            </div>

                <Carousel variant="dark" className="col-12 col-lg-8">
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
                <div>
                    <h4>
                        Mission Statement:
                    </h4>
                        <p>Thank you for visiting MissionCitizen, a site dedicated to making volunteerism easy! Here at MissionCitizen, we believe giving back is our mission and civic duty. Consider becoming a MissionCitizen today!</p>
                </div>
    <div>
        <h3>PLACEHOLDER: volunteer hours </h3>
    </div>
    <InputGroup className="mb-3">
        <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
        <FormControl
            aria-label="Search"
            aria-describedby="inputGroup-sizing-default"
        />
    </InputGroup>
    <div>

        <Image src={MapBoxPlaceHolder} alt="MapBox" className="col-12 col-lg-8"/>
    </div>



    <Card>
        <CardHeader as="h5">Featured</CardHeader>
        <Card.Body>
            <Card.Title>Special title treatment</Card.Title>
            <Card.Text>
                With supporting text below as a natural lead-in to additional content.
            </Card.Text>
            <button>Go somewhere</button>
        </Card.Body>
    </Card>

</Container>
        </>
    )

}