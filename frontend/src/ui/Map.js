import React, {useState} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import GPS_cursor from "./images/gps-pin-black.png";
import "./style.css";
import {Card} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";

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
            width: "100vw",
            height: "100vh",
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
                width: "100vw",
                height: "100vh",
                zoom: 10
            }
            return viewport;
        });
    }

    return (
            <>
                <div>
                    <ReactMapGL
                        {...viewport}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                        mapStyle="mapbox://styles/akpowers1986/cks64jxs869f317qpopvvckls"
                        onViewportChange={viewport => {
                            setViewport(viewport);
                        }}
                    >
                        <p color="white">Make sure you enable access to your gps!</p>
                        {parkData.map(place => (
                            <Marker key={place.id} latitude={place.latitude} longitude={place.longitude}>
                                <button className="marker-btn"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedPlace(place);
                                        }}>
                                    <img src={GPS_cursor} alt="gps pin"/>
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
            </>
        )
}