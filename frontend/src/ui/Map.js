
import React, {useState, useEffect} from "react";
import ReactMapGL, {Marker, Popup} from "react-map-gl";
import GPS_cursor from "./images/MC3YellowNoText.svg";
import "./style.css";
import {useSelector} from "react-redux";

let currentLat = 0;
let currentLong = 0;
let init = true;





export function Map(inputs) {
    const events = useSelector(state => state.events ? state.events : [])
//console.log(events)
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
            if(screenWidth > 750) {
                viewport.width = inputs.width;
                viewport.height = inputs.height;
            } else {
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

                {events.map(place => (
                    <Marker key={place.eventId}
                            latitude={Number(place.eventLatitude)}
                            longitude={Number(place.eventLongitude)}
                            offsetLeft={-25.5}
                            offsetTop={-36}
                    >
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
                        latitude={Number(selectedPlace.eventLatitude)}
                        longitude={Number(selectedPlace.eventLongitude)}
                        onClose={() => {
                            setSelectedPlace(null);
                        }}>
                        <div>
                            <h6>{selectedPlace.eventTitle}</h6>
                            <p>{selectedPlace.eventAddress}</p>
                        </div>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </>
    )
}
