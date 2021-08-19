
import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import GPS_cursor from "./images/gps-pin-black.png";
import "./style.css";

let currentLat = 0;
let currentLong = 0;
let init = true;
let eventData = [
    {
        id: 0,
        name: "home",
        address: "3713 Fieldstone Circle",
        description: "The place that I live",
        latitude: 36.7932057,
        longitude: -76.1117332
    }
];

export function Map(inputs) {
    const [viewport, setViewport] = useState(() => {
        return {
            latitude: currentLat,
            longitude: currentLong,
            width: inputs.width,
            height: inputs.height,
            zoom: 10
        }
    });

    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
        const listener = (e) => {
            if (e.key === "Escape") {
                setSelectedPlace(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('resize', updateMap);

        return () => {
            window.removeEventListener('resize', updateMap);
        }
    }, []);


    if (init) {
        navigator.geolocation.getCurrentPosition(position => {
            currentLat = position.coords.latitude;
            currentLong = position.coords.longitude;
            updateMap();
            init = false;
        });
    }

    function updateMap() {
        let screenWidth = document.documentElement.clientWidth;
        setViewport(() => {
            viewport.latitude = currentLat;
            viewport.longitude = currentLong;
            console.log(screenWidth);
            if(screenWidth > 750) {
                console.log("Screenwidth > 750");
                viewport.width = inputs.width;
                viewport.height = inputs.height;
            } else {
                console.log("Screendwidth is mobile");
                viewport.width = "93vw";
                viewport.height = "65vh";
            }
            return viewport;
        });
    }



    return (
        <>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/akpowers1986/cks64jxs869f317qpopvvckls"
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >
                <p color="white">Make sure you enable access to your gps!</p>
                {eventData.map(place => (
                    <Marker key={place.id} latitude={place.latitude} longitude={place.longitude} offsetLeft={-25.5}
                            offsetTop={-36}>
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
        </>
    )
}