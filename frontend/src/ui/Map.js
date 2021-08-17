import React, {useState} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import GPS_cursor from "./images/gps-pin-black.png";
import "./style.css";
import {Accordion, FormControl, InputGroup, Nav} from "react-bootstrap";


let currentLat = 0;
let currentLong = 0;
let init = true;
let parkData = [
        {
            id: 0,
            name: "home",
            address: "3713 Fieldstone Circle",
            description: "The place that I live",
            latitude: 36.7932057,
            longitude: -76.1117332
        }
        ];

export function Map () {
    const [viewport, setViewport] = useState(() => {
        return {
            latitude: currentLat,
            longitude: currentLong,
            width: "38vw",
            height: "50vh",
            zoom: 10
        }
    });
    const [selectedPlace, setSelectedPlace] = useState(null);

    if(init) {
        navigator.geolocation.getCurrentPosition(position => {
            currentLat = position.coords.latitude;
            currentLong = position.coords.longitude;
            updateMap();
            init = false;
        });
    }

    function updateMap() {
        setViewport(viewport => {
            viewport = {
                latitude: currentLat,
                longitude: currentLong,
                width: "38vw",
                height: "50vh",
                zoom: 10
            }
            return viewport;
        });
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);
    return (
            <>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                    <FormControl
                        aria-label="Search"
                        aria-describedby="inputGroup-sizing-default"
                    />
                </InputGroup>
                <div className="row d-flex justify-content-between">
                <div className="col-md-6 mb-3">
                    <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        mapStyle="mapbox://styles/akpowers1986/cks64jxs869f317qpopvvckls"
                        onViewportChange={viewport => {
                            setViewport(viewport);
                        }}
                    >

                        {parkData.map(place => (
                            <Marker key={place.id} latitude={place.latitude} longitude={place.longitude}>
                                <button className="marker-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedPlace(place);
                                        }}>
                                    <img src={GPS_cursor} alt="gps pin" width={50}/>
                                </button>
                            </Marker>
                        ))}
                        {selectedPlace ? (
                            <Popup
                                latitude={selectedPlace.latitude}
                                longitude={selectedPlace.longitude}
                                onClose={() => {
                                    setSelectedPlace(null);
                                }}>
                                <div>
                                    <h2>{selectedPlace.name}</h2>
                                    <p>{selectedPlace.address}</p>
                                    <p>{selectedPlace.description}</p>
                                </div>
                            </Popup>
                        ) : null}
                    </ReactMapGL>
                </div>

                    <div className="col-md-6 mb-3">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Volunteer Opportunity Event 1</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                est laborum.
                            </Accordion.Body>
                            <p className="d-inline-block">Please register ana account to volunteer.</p>
                            <Nav.Link href="#" onClick={toggleShow} className= "d-inline-block">Register</Nav.Link>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Volunteer Opportunity Event 2</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                est laborum.
                            </Accordion.Body>
                            <p className="d-inline-block">Please register ana account to volunteer.</p>
                            <Nav.Link href="#" onClick={toggleShow} className="d-inline-block">Register</Nav.Link>
                        </Accordion.Item>
                    </Accordion>
                </div>
                </div>
            </>
        )
}